// Vercel serverless function: POST /api/problem
// Receives a visitor's workflow problem (plain text, optional contact) and emails it to
// the owner through Resend. The API key stays server-side, never in the browser bundle.
//
// Env (set in Vercel project settings, or .env.local for local dev):
//   RESEND_API_KEY       required in production
//   PROBLEM_INBOX_EMAIL  where messages go (defaults to the address already public on the site)

const MAX_PROBLEM = 1500;
const MIN_PROBLEM = 8;
const MAX_CONTACT = 200;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort per-instance rate limit. Serverless instances are short-lived, so this only
// slows down bursts from one IP; it is not a hard global limit.
const recent = new Map<string, number[]>();

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

// Strips control characters (keeping tab and newlines), trims, and caps the length.
function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  const printable = Array.from(value)
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      return code >= 32 || ch === "\n" || ch === "\t";
    })
    .join("");
  return printable.trim().slice(0, max);
}

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json({ ok: false, error: "Not allowed." }, 403);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Bad request." }, 400);
  }

  // Honeypot: a field real visitors never see. Bots fill it in; pretend success.
  if (clean(body.website, 200)) return json({ ok: true });

  const problem = clean(body.problem, MAX_PROBLEM);
  const contact = clean(body.contact, MAX_CONTACT);
  if (problem.length < MIN_PROBLEM) {
    return json({ ok: false, error: "Tell me a little more about the problem." }, 400);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, error: "Too many messages at once. Try again in a few minutes." }, 429);
  }

  const text = [
    "New workflow problem from the portfolio site:",
    "",
    problem,
    "",
    `Contact: ${contact || "(none left, anonymous)"}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`\n[api/problem] RESEND_API_KEY not set, printing instead of emailing:\n${text}\n`);
      return json({ ok: true });
    }
    return json({ ok: false, error: "Sending isn't set up yet." }, 503);
  }

  const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) ? contact : undefined;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      // Resend's shared sender works without verifying a domain, for mail to your own account address.
      from: "Portfolio <onboarding@resend.dev>",
      to: [process.env.PROBLEM_INBOX_EMAIL || "richmaina0@gmail.com"],
      subject: `Workflow problem: ${problem.slice(0, 60)}${problem.length > 60 ? "..." : ""}`,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    console.error("[api/problem] Resend error", response.status, await response.text());
    return json({ ok: false, error: "Couldn't send right now." }, 502);
  }
  return json({ ok: true });
}
