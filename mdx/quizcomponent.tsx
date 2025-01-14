"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export interface QuizComponentProps {
  question?: string;
  options?: string[];
  answer?: string;
}

const defaultProps = {
  question: "Which is the valid option to connect a computer to the internet?",
  options: ["To connect it via cable", "To have a set top box", "Wifi", "All"],
  answer: "All",
};

export default function QuizComponent({
  question = defaultProps.question,
  options = defaultProps.options,
  answer = defaultProps.answer,
}: QuizComponentProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelected(option);
    setIsCorrect(option === answer);
  };

  if (!Array.isArray(options) || options.length === 0) {
    return (
      <div className="text-foreground">Please provide valid quiz options</div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border bg-card shadow-lg m-3">
      <CardContent className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
        <motion.h3
          className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground leading-relaxed"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {question}
        </motion.h3>

        <div className="grid gap-3 sm:gap-4">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.3,
                ease: "easeOut",
              }}
              onHoverStart={() => setIsHovering(index)}
              onHoverEnd={() => setIsHovering(null)}
            >
              <Button
                variant={selected === option ? "secondary" : "outline"}
                className={`w-full min-h-[3.5rem] sm:min-h-[4rem] p-4 sm:p-5 text-left justify-start relative
                  text-sm sm:text-base md:text-lg font-medium
                  ${
                    selected === option && isCorrect
                      ? "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800 shadow-green-100/50 dark:shadow-green-900/20"
                      : ""
                  }
                  ${
                    selected === option && !isCorrect
                      ? "bg-destructive/10 border-destructive/50 shadow-destructive/20"
                      : ""
                  }
                  hover:scale-[1.01] active:scale-[0.99]
                  transition-all duration-300 ease-in-out shadow-sm hover:shadow-md`}
                onClick={() => handleOptionSelect(option)}
                disabled={selected !== null}
              >
                <motion.span
                  animate={{
                    scale: isHovering === index ? 1.02 : 1,
                    x: isHovering === index ? 10 : 0,
                  }}
                  className="relative z-10 line-clamp-2 sm:line-clamp-1 px-2"
                >
                  {option}
                </motion.span>
              </Button>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              className={`flex items-center gap-3 p-4 sm:p-6 rounded-xl shadow-lg
                ${
                  isCorrect
                    ? "bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    : "bg-destructive/10 border border-destructive/50"
                }`}
            >
              {isCorrect ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center gap-3 text-green-700 dark:text-green-300"
                >
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                    Excellent choice! That&apos;s correct!
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center gap-3 text-destructive"
                >
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                    Not quite there. Want to try again?
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
