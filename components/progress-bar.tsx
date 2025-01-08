"use client";
import React from "react";
import { useSpring, useScroll, motion } from "framer-motion";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-muted via-primary to-secondary origin-[0%] z-50"
      style={{ scaleX }}
    />
  );
};

export default ProgressBar;
