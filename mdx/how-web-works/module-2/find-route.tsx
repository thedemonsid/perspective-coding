"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PACKET_TYPES = {
  WEB: {
    emojis: ["🌐", "📱", "💻", "🖥️"],
    color: "bg-blue-500",
    description: "Web Traffic",
    examples: ["websites", "social media", "streaming"],
  },
  FILES: {
    emojis: ["📁", "📷", "🎵", "📄"],
    color: "bg-green-500",
    description: "File Sharing",
    examples: ["photos", "music", "documents"],
  },
  ADDRESS: {
    emojis: ["🔍", "📍", "🗺️", "🏠"],
    color: "bg-yellow-500",
    description: "Address Lookup",
    examples: ["DNS", "website locations"],
  },
  MAIL: {
    emojis: ["📧", "💌", "✉️", "📨"],
    color: "bg-red-500",
    description: "Digital Mail",
    examples: ["emails", "messages"],
  },
};

interface FallingPacket {
  id: string;
  type: keyof typeof PACKET_TYPES;
  emoji: string;
  x: number;
  y: number;
}

const PacketSorter = () => {
  const [packets, setPackets] = useState<FallingPacket[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [spawnRate, setSpawnRate] = useState(2000);
  const [timeLeft, setTimeLeft] = useState(60);

  const generatePacket = () => {
    const types = Object.keys(PACKET_TYPES) as Array<keyof typeof PACKET_TYPES>;
    const type = types[Math.floor(Math.random() * types.length)];
    const emoji =
      PACKET_TYPES[type].emojis[
        Math.floor(Math.random() * PACKET_TYPES[type].emojis.length)
      ];

    return {
      id: Math.random().toString(),
      type,
      emoji,
      x: Math.random() * 80 + 10, // 10-90% of width
      y: -10,
    };
  };

  useEffect(() => {
    if (!gameActive) return;

    const spawnInterval = setInterval(() => {
      setPackets((prev) => [...prev, generatePacket()]);
    }, spawnRate);

    const gameTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          setGameOver(true);
          clearInterval(spawnInterval);
          clearInterval(gameTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const difficultyTimer = setInterval(() => {
      setSpawnRate((prev) => Math.max(prev * 0.9, 500));
    }, 10000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(gameTimer);
      clearInterval(difficultyTimer);
    };
  }, [gameActive]);

  const startGame = () => {
    setGameActive(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setSpawnRate(2000);
    setPackets([generatePacket()]);
  };

  const handleSort = (
    packetId: string,
    targetType: keyof typeof PACKET_TYPES
  ) => {
    const packet = packets.find((p) => p.id === packetId);
    if (!packet) return;

    if (packet.type === targetType) {
      setScore((prev) => prev + 10);
    } else {
      setScore((prev) => Math.max(0, prev - 5));
    }

    setPackets((prev) => prev.filter((p) => p.id !== packetId));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Internet Traffic Sorter 🚦</span>
          <div className="flex gap-4">
            <Badge variant="secondary">Score: {score}</Badge>
            <Badge variant="outline">Time: {timeLeft}s</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!gameActive && !gameOver ? (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Sort Internet Traffic!</h3>
            <p>
              Route falling packets to their correct destinations before time
              runs out!
            </p>
            <Button onClick={startGame} size="lg" className="animate-bounce">
              Start Sorting!
            </Button>
          </div>
        ) : (
          <div className="relative h-[600px] border rounded-lg overflow-hidden">
            <AnimatePresence>
              {packets.map((packet) => (
                <motion.div
                  key={packet.id}
                  initial={{ x: `${packet.x}%`, y: "-10%" }}
                  animate={{ y: "110%" }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="absolute text-4xl cursor-pointer"
                  onClick={() => handleSort(packet.id, packet.type)}
                >
                  {packet.emoji}
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="absolute bottom-0 w-full flex justify-around">
              {Object.entries(PACKET_TYPES).map(([type, info]) => (
                <motion.div
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  className={`${info.color} p-4 rounded-t-lg text-white text-center w-1/5`}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => {
                    const lowestPacket = [...packets]
                      .sort((a, b) => (b.y || 0) - (a.y || 0))
                      .pop();
                    if (lowestPacket) {
                      handleSort(
                        lowestPacket.id,
                        type as keyof typeof PACKET_TYPES
                      );
                    }
                  }}
                >
                  <div className="text-2xl mb-2">{info.emojis[0]}</div>
                  <div className="text-sm font-bold">{info.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {gameOver && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center space-y-4"
          >
            <h3 className="text-2xl font-bold">Game Over!</h3>
            <p>Final Score: {score}</p>
            <Button onClick={startGame}>Play Again</Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default PacketSorter;
