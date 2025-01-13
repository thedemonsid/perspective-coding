"use client";
import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const MyComponent = () => {
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Transform drag position to scale value
  const scale = useTransform([dragX, dragY], ([latestX, latestY]) => {
    //@ts-expect-error - useTransform types don't correctly infer tuple array inputs
    const distance = Math.sqrt(latestX * latestX + latestY * latestY);
    return Math.max(1, distance / 100);
  });

  return (
    <div className="relative h-[300px] w-full border border-border rounded-lg overflow-hidden">
      <motion.div
        drag
        dragConstraints={{
          top: -150,
          right: 150,
          bottom: 150,
          left: -150,
        }}
        style={{
          x: dragX,
          y: dragY,
          scale,
        }}
        className="absolute left-1/2 top-1/2 h-16 w-16 cursor-grab active:cursor-grabbing"
      >
        <div className="h-full w-full rounded-full bg-gradient-to-r from-primary to-secondary" />
      </motion.div>
    </div>
  );
};

export default MyComponent;
