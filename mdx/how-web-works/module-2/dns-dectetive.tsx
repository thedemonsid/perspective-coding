"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

interface DomainPuzzle {
  correct: string;
  type: string;
  options: string[];
  question: string;
  answer: string;
  difficulty: number;
}

interface Puzzle {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

const DNS_PUZZLES: Puzzle[] = [
  // ...existing puzzle data...
];

const DNSDetective = () => {
  const [mounted, setMounted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState<DomainPuzzle | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);

  const puzzles: DomainPuzzle[] = [
    {
      type: "ip-to-domain",
      question: "142.250.190.78",
      options: ["google.com", "facebook.com", "twitter.com", "instagram.com"],
      correct: "google.com",
      answer: "google.com",
      difficulty: 1,
    },
    {
      type: "domain-to-record",
      question: "What type of DNS record is used for email servers?",
      options: ["A Record", "MX Record", "CNAME Record", "TXT Record"],
      correct: "MX Record",
      answer: "MX Record",
      difficulty: 2,
    },
    {
      type: "dns-hierarchy",
      question: "Which server is consulted first in DNS resolution?",
      options: [
        "Root Server",
        "Local Cache",
        "TLD Server",
        "Authoritative Server",
      ],
      correct: "Local Cache",
      answer: "Local Cache",
      difficulty: 3,
    },
  ];
  console.log(puzzles);

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(60);
    setStreak(0);
    nextPuzzle();
  };

  const endGame = () => {
    setGameActive(false);
    setCurrentPuzzle(null);
  };

  const getRandomPuzzle = React.useCallback(() => {
    const puzzles: Puzzle[] = DNS_PUZZLES;
    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    return {
      ...puzzle,
      correct: puzzle.answer,
      type: "generic",
      difficulty: 1,
    };
  }, []); // Empty deps array as DNS_PUZZLES is now constant

  const nextPuzzle = () => {
    const randomPuzzle = getRandomPuzzle();
    setCurrentPuzzle(randomPuzzle);
    setSelectedAnswer(null);
  };

  const checkAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (currentPuzzle && answer === currentPuzzle.correct) {
      setScore((prev) => prev + 10 * (streak + 1));
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
    setTimeout(nextPuzzle, 1000);
  };

  if (!mounted) {
    return (
      <Card className="p-4 sm:p-6 w-full max-w-2xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-32 bg-muted rounded" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 sm:p-6 w-full max-w-2xl mx-auto">
      <div className="flex flex-col space-y-4">
        {/* Game Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold">DNS Detective</h3>
            <p className="text-sm text-muted-foreground">
              Solve domain name puzzles
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              Score: {score}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Time: {timeLeft}s
            </Badge>
          </div>
        </div>

        {/* Game Content */}
        {!gameActive ? (
          <div className="text-center space-y-4 py-8">
            <Award className="w-16 h-16 mx-auto text-primary" />
            <h4 className="text-lg font-semibold">
              {score > 0 ? `Game Over! Score: ${score}` : "Ready to Play?"}
            </h4>
            <Button onClick={startGame} size="lg">
              {score > 0 ? "Play Again" : "Start Game"}
            </Button>
          </div>
        ) : (
          currentPuzzle && (
            <motion.div
              key={currentPuzzle.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center py-4">
                <h4 className="text-lg font-semibold mb-2">
                  {currentPuzzle.question}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentPuzzle.type === "ip-to-domain"
                    ? "Which domain does this IP belong to?"
                    : "Select the correct answer"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {currentPuzzle.options.map((option: string) => (
                  <Button
                    key={option}
                    variant={
                      selectedAnswer === option
                        ? option === currentPuzzle.correct
                          ? "default"
                          : "destructive"
                        : "outline"
                    }
                    onClick={() => !selectedAnswer && checkAnswer(option)}
                    disabled={selectedAnswer !== null}
                    className="h-16"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </motion.div>
          )
        )}

        <Progress value={(timeLeft / 60) * 100} className="h-2" />
      </div>
    </Card>
  );
};

export default DNSDetective;
