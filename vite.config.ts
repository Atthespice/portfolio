import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Serves the Vercel function in api/problem.ts during `npm run dev`, so the "send me
// your problem" box works locally without `vercel dev`. Production uses Vercel's own runtime.
function devApi(): Plugin {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))
      server.middlewares.use('/api/problem', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const request = new Request(`http://${req.headers.host}/api/problem`, {
          method: 'POST',
          headers: req.headers as Record<string, string>,
          body: Buffer.concat(chunks),
        })
        const mod = await server.ssrLoadModule('/api/problem.ts')
        const response: Response = await mod.POST(request)
        res.statusCode = response.status
        response.headers.forEach((value, key) => res.setHeader(key, value))
        res.end(await response.text())
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), devApi()],
})
