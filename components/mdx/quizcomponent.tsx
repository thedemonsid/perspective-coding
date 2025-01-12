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
    <Card className="w-full max-w-2xl mx-auto border bg-card">
      <CardContent className="p-3 sm:p-6 space-y-4 sm:space-y-6">
        <motion.h3
          className="text-lg sm:text-xl font-semibold text-foreground leading-tight"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {question}
        </motion.h3>

        <div className="space-y-2 sm:space-y-3">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setIsHovering(index)}
              onHoverEnd={() => setIsHovering(null)}
            >
              <Button
                variant={selected === option ? "secondary" : "outline"}
                className={`w-full min-h-[3rem] p-2 sm:p-4 text-left justify-start relative text-sm sm:text-base
                  ${
                    selected === option && isCorrect
                      ? "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : ""
                  }
                  ${
                    selected === option && !isCorrect
                      ? "bg-destructive/10 border-destructive/50"
                      : ""
                  }
                  transition-all duration-300`}
                onClick={() => handleOptionSelect(option)}
                disabled={selected !== null}
              >
                <motion.span
                  animate={{
                    scale: isHovering === index ? 1.02 : 1,
                    x: isHovering === index ? 10 : 0,
                  }}
                  className="relative z-10 line-clamp-2 sm:line-clamp-1"
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`flex items-center gap-2 p-3 sm:p-4 rounded-lg ${
                isCorrect
                  ? "bg-green-100 dark:bg-green-900/20"
                  : "bg-destructive/10"
              }`}
            >
              {isCorrect ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center gap-2 text-green-700 dark:text-green-300"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-medium">
                    Excellent choice! That&apos;s correct!
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center gap-2 text-destructive"
                >
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-medium">
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
