"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Wifi, AlertTriangle } from "lucide-react";

const NetworkDefenseGame = () => {
  const [score, setScore] = useState(0);
  const [currentThreat, setCurrentThreat] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const layers = [
    { id: 1, name: "Firewall", icon: Shield },
    { id: 2, name: "Encrypt", icon: Lock },
    { id: 3, name: "Monitor", icon: Wifi },
  ];

  const [activeLayers, setActiveLayers] = useState<number[]>([]);

  const threats = [
    { id: 1, name: "Virus", requires: [1, 3] },
    { id: 2, name: "Breach", requires: [2] },
    { id: 3, name: "Attack", requires: [1, 2, 3] },
  ];

  const toggleLayer = (id: number) => {
    setActiveLayers((prev) =>
      prev.includes(id)
        ? prev.filter((layerId) => layerId !== id)
        : [...prev, id]
    );
  };

  const generateThreat = () => {
    const threat = threats[Math.floor(Math.random() * threats.length)];
    setCurrentThreat(threat.id);
    setFeedback("");
  };

  const checkDefense = () => {
    if (!currentThreat) return;

    const threat = threats.find((t) => t.id === currentThreat);
    const hasAllRequired = threat?.requires.every((r) =>
      activeLayers.includes(r)
    );

    if (hasAllRequired) {
      setScore((prev) => prev + 10);
      setFeedback("✨ Blocked!");
    } else {
      setScore((prev) => Math.max(0, prev - 5));
      setFeedback("❌ Failed");
    }
  };

  return (
    <Card className="min-h-[100svh] flex flex-col bg-gradient-to-br from-background to-muted/50">
      {/* Header */}
      <div className="shrink-0 p-4 flex justify-between items-center border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <span className="text-sm font-medium text-primary">
          Network Defense
        </span>
        <span className="text-sm font-semibold text-primary">{score} pts</span>
      </div>

      {/* Main Game Area */}
      <div className="grow flex flex-col justify-between gap-6 p-6">
        {/* Security Toggles - Row Layout */}
        <div className="flex justify-center gap-3">
          {layers.map((layer) => (
            <motion.button
              key={layer.id}
              onClick={() => toggleLayer(layer.id)}
              className={`
                flex flex-col items-center justify-center gap-1 p-2 rounded-lg
                ${
                  activeLayers.includes(layer.id)
                    ? "bg-primary/10 border-primary shadow-sm"
                    : "bg-muted/50 border-muted"
                } border transition-all hover:shadow-md
              `}
              whileTap={{ scale: 0.95 }}
            >
              <layer.icon
                className={`w-5 h-5 ${
                  activeLayers.includes(layer.id)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-xs ${
                  activeLayers.includes(layer.id)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {layer.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Threat Display */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentThreat ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-center"
              >
                <AlertTriangle className="w-12 h-12 mx-auto text-destructive/80 mb-4" />
                <div className="text-lg font-semibold">
                  {threats.find((t) => t.id === currentThreat)?.name}
                </div>
                {feedback && (
                  <div
                    className={`text-lg mt-4 font-semibold ${
                      feedback === "✨ Blocked!"
                        ? "text-primary"
                        : "text-destructive"
                    }`}
                  >
                    {feedback}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground"
              >
                Tap Generate to Start
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={generateThreat}
            variant="outline"
            className="h-12 text-sm sm:text-base"
          >
            Generate Threat
          </Button>
          <Button
            onClick={checkDefense}
            disabled={!currentThreat}
            className="h-12 text-sm sm:text-base"
          >
            Check Defense
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NetworkDefenseGame;
