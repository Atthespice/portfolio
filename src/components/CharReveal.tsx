import { motion } from "framer-motion";
import { useReducedMotion } from "../lib/useReducedMotion";

interface CharRevealProps {
  text: string;
  className?: string;
}

/**
 * Character-by-character reveal, triggered once the text scrolls into view
 * (§8 About teaser). Framer Motion's `staggerChildren` fans the delay out per
 * character rather than needing a manual per-index scroll calculation. Renders
 * at full opacity immediately under prefers-reduced-motion (§9).
 */
export function CharReveal({ text, className = "" }: CharRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  const words = text.split(" ");

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ visible: { transition: { staggerChildren: 0.012 } } }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-pre">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.25 }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.p>
  );
}
