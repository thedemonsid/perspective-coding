"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, AlertCircle } from "lucide-react";

interface Puzzle {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  difficulty: number;
}

const DNS_PUZZLES: Puzzle[] = [
  {
    id: "1",
    question: "If DNS was a school directory, what would the Root Server be?",
    options: [
      "The Principal's Office",
      "The School Library",
      "The Front Desk",
      "The Classroom",
    ],
    answer: "The Front Desk",
    explanation:
      "Just like how the front desk knows where every department is in school, Root Servers are like the starting point that knows where to find all top-level domains (.com, .org, etc.)",
    difficulty: 1,
  },
  {
    id: "2",
    question:
      "Your friend says 'Instagram.com is down but I can still access Netflix.com'. What's likely happening?",
    options: [
      "Instagram's DNS server is down",
      "Your friend's internet is broken",
      "Netflix has better servers",
      "Instagram is blocking your friend",
    ],
    answer: "Instagram's DNS server is down",
    explanation:
      "When a website's DNS server stops working, it's like their address disappeared from the internet's phone book. Other websites with working DNS (like Netflix) remain accessible!",
    difficulty: 2,
  },
  {
    id: "3",
    question: "What happens first when you type 'TikTok.com' in your browser?",
    options: [
      "TikTok's videos start loading",
      "Your device checks its DNS cache",
      "The app store opens",
      "Your WiFi turns on",
    ],
    answer: "Your device checks its DNS cache",
    explanation:
      "It's like checking your phone's contact list before asking a friend for a number. Your device first checks if it remembers TikTok's address from a previous visit!",
    difficulty: 1,
  },
  {
    id: "4",
    question: "Which is like a DNS server for your phone contacts?",
    options: [
      "Your phone's battery",
      "Your contact list backup",
      "Your phone's camera",
      "Your screen brightness",
    ],
    answer: "Your contact list backup",
    explanation:
      "Just like how your contact list backup helps you find phone numbers, DNS servers help computers find website addresses!",
    difficulty: 1,
  },
  {
    id: "5",
    question:
      "If YouTube suddenly stopped working worldwide, what's the LEAST likely cause?",
    options: [
      "YouTube's DNS servers failed",
      "Your local DNS cache is corrupt",
      "Google's servers are down",
      "Your browser needs updating",
    ],
    answer: "Your local DNS cache is corrupt",
    explanation:
      "A local DNS issue only affects your device - like having a wrong number saved in your phone. It couldn't cause YouTube to stop working for everyone!",
    difficulty: 3,
  },
  {
    id: "6",
    question: "What's similar to DNS caching in real life?",
    options: [
      "Writing down a friend's address",
      "Taking the bus to school",
      "Eating lunch",
      "Playing video games",
    ],
    answer: "Writing down a friend's address",
    explanation:
      "Just like writing down an address so you don't have to ask for it again, DNS caching saves website addresses for faster future access!",
    difficulty: 2,
  },
  {
    id: "7",
    question:
      "Your school's website works on your phone but not on your laptop. What's the first thing to try?",
    options: [
      "Restart the school server",
      "Clear your laptop's DNS cache",
      "Change your phone settings",
      "Call your internet provider",
    ],
    answer: "Clear your laptop's DNS cache",
    explanation:
      "If a website works on one device but not another, it's like having an old address saved. Clearing your DNS cache is like updating your address book!",
    difficulty: 2,
  },
  {
    id: "8",
    question: "What's a DNS resolver most like?",
    options: [
      "A GPS navigator",
      "A car engine",
      "A traffic light",
      "A road sign",
    ],
    answer: "A GPS navigator",
    explanation:
      "Like a GPS helping you find locations step by step, a DNS resolver helps find website addresses by checking different DNS servers!",
    difficulty: 3,
  },
];

const DNSDetective = () => {
  const [mounted, setMounted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]);
  const [streak, setStreak] = useState(0);
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);

  useEffect(() => {
    setMounted(true);
    setPuzzles(DNS_PUZZLES);
    setSelectedAnswers(new Array(DNS_PUZZLES.length).fill(null));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (currentPuzzleIndex < puzzles.length - 1) {
        setCurrentPuzzleIndex((prev) => prev + 1);
        setTimeLeft(10);
      } else {
        endGame();
      }
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft, currentPuzzleIndex, puzzles.length]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(10);
    setStreak(0);
    setCurrentPuzzleIndex(0);
    setSelectedAnswers(new Array(puzzles.length).fill(null));
  };

  const endGame = () => {
    setGameActive(false);
  };

  const checkAnswer = (answer: string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentPuzzleIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);

    const currentPuzzle = puzzles[currentPuzzleIndex];
    if (currentPuzzle && answer === currentPuzzle.answer) {
      setScore((prev) => prev + 10 * (streak + 1));
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex((prev) => prev + 1);
      setTimeLeft(10);
    } else {
      endGame();
    }
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
            <Badge variant="outline" className="text-sm">
              Streak: {streak}
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
          puzzles.map((puzzle, index) => (
            <AnimatePresence key={puzzle.id} mode="wait">
              {index === currentPuzzleIndex && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center py-4">
                    <h4 className="text-lg font-semibold mb-2">
                      {puzzle.question}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Difficulty: {puzzle.difficulty}/3
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {puzzle.options.map((option: string) => (
                      <Button
                        key={option}
                        variant={
                          selectedAnswers[index] === option
                            ? option === puzzle.answer
                              ? "default"
                              : "destructive"
                            : "outline"
                        }
                        onClick={() => checkAnswer(option)}
                        disabled={selectedAnswers[index] !== null}
                        className="h-16"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>

                  {selectedAnswers[index] !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-muted p-4 rounded-md"
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h5 className="font-semibold mb-1">Explanation:</h5>
                          <p className="text-sm">{puzzle.explanation}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          ))
        )}

        <Progress value={(timeLeft / 10) * 100} className="h-2" />
      </div>
    </Card>
  );
};

export default DNSDetective;
