import { motion } from "framer-motion";

interface CloudProps {
  position: "top" | "bottom";
  className?: string;
}

export const Cloud = ({ position, className }: CloudProps) => {
  const variants = {
    hidden: { opacity: 0, y: position === "top" ? -20 : 20 },
    visible: {
      opacity: 0.15,
      y: 0,
      transition: {
        duration: 2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={`absolute ${
        position === "top" ? "-top-24" : "-bottom-24"
      } left-0 w-full overflow-hidden z-10 ${className}`}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-rb from-zinc-300/20 via-zinc-500/20 to-zinc-300/20 blur-2xl" />
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto fill-blue-400 mix-blend-screen"
          preserveAspectRatio="none"
        >
          <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,197.3C672,192,768,160,864,170.7C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,197.3C672,192,768,160,864,170.7C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>
    </motion.div>
  );
};
