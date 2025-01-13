"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Pause, Play, RefreshCw, Shield, Wifi } from "lucide-react";

interface Threat {
  id: number;
  position: number;
  damage: number;
}

interface Defense {
  type: string;
  position: number;
}

interface DefenseType {
  cost: number;
  icon: React.ElementType;
  name: string;
}

const INITIAL_RESOURCES = 50;
const INITIAL_HEALTH = 100;
const GRID_SIZE = 4;
const THREAT_SPEED = 2000;

const defenseTypes: Record<string, DefenseType> = {
  firewall: { cost: 20, icon: Shield, name: "Firewall" },
  antivirus: { cost: 30, icon: Wifi, name: "Antivirus" },
};

const NetworkDefenseGame = () => {
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [networkHealth, setNetworkHealth] = useState(INITIAL_HEALTH);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [defenses, setDefenses] = useState<Defense[]>([]);
  const [selectedDefense, setSelectedDefense] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const healthRef = useRef(networkHealth);

  // Update ref when health changes
  useEffect(() => {
    healthRef.current = networkHealth;
  }, [networkHealth]);

  const generateThreat = useCallback(
    (): Threat => ({
      id: Date.now(),
      position: Math.floor(Math.random() * GRID_SIZE),
      damage: 10,
    }),
    []
  );

  const spawnThreat = useCallback(() => {
    setThreats((prev) => [...prev, generateThreat()]);
  }, [generateThreat]);

  const handleCollision = useCallback((threatId: number, damage: number) => {
    setThreats((prev) => prev.filter((t) => t.id !== threatId));
    if (healthRef.current > 0) {
      setNetworkHealth((prev) => Math.max(0, prev - damage));
    }
  }, []);

  const placeDefense = useCallback(
    (position: number) => {
      if (!selectedDefense || !defenseTypes[selectedDefense]) return;
      const defenseCost = defenseTypes[selectedDefense].cost;
      if (resources < defenseCost) return;

      setResources((prev) => prev - defenseCost);
      setDefenses((prev) => [...prev, { type: selectedDefense, position }]);
    },
    [selectedDefense, resources]
  );

  const resetGame = useCallback(() => {
    setResources(INITIAL_RESOURCES);
    setNetworkHealth(INITIAL_HEALTH);
    setThreats([]);
    setDefenses([]);
    setScore(0);
    setPaused(false);
    setGameOver(false);
  }, []);

  useEffect(() => {
    if (paused || gameOver) return;
    const interval = setInterval(spawnThreat, THREAT_SPEED);
    return () => clearInterval(interval);
  }, [paused, gameOver, spawnThreat]);

  useEffect(() => {
    threats.forEach((threat) => {
      const isBlocked = defenses.some(
        (defense) => defense.position === threat.position
      );
      if (!isBlocked) {
        handleCollision(threat.id, threat.damage);
      }
    });
  }, [threats, defenses, handleCollision]);

  useEffect(() => {
    if (networkHealth <= 0) {
      setGameOver(true);
      setHighScore((prev) => Math.max(prev, score));
    }
  }, [networkHealth, score]);

  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <div className="p-4 flex justify-between items-center border-b">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Network Defense</h2>
          <div className="text-sm text-gray-500">Resources: {resources}</div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <Play className="w-4 h-4" />
            ) : (
              <Pause className="w-4 h-4" />
            )}
          </Button>
          <Button size="sm" variant="outline" onClick={resetGame}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Network Health</span>
            <span>{networkHealth}%</span>
          </div>
          <Progress
            value={networkHealth}
            max={INITIAL_HEALTH}
            className="h-2"
          />
        </div>

        <div className="grid grid-cols-4 gap-4 aspect-square">
          {Array.from({ length: GRID_SIZE }).map((_, index) => (
            <button
              key={index}
              onClick={() => placeDefense(index)}
              className="relative border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              {threats.map(
                (threat) =>
                  threat.position === index && (
                    <div
                      key={threat.id}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 h-6 w-6 rounded-full animate-pulse"
                    />
                  )
              )}
              {defenses.map(
                (defense, idx) =>
                  defense.position === index && (
                    <div
                      key={idx}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 h-6 w-6 rounded-full"
                    />
                  )
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {Object.entries(defenseTypes).map(
            ([key, { icon: Icon, cost, name }]) => (
              <Button
                key={key}
                variant={selectedDefense === key ? "default" : "outline"}
                onClick={() => setSelectedDefense(key)}
                disabled={resources < cost}
                className="flex gap-2"
              >
                <Icon className="w-4 h-4" />
                <span>
                  {name} ({cost})
                </span>
              </Button>
            )
          )}
        </div>

        <div className="text-center space-x-4">
          <span className="text-sm">Score: {score}</span>
          <span className="text-sm">High Score: {highScore}</span>
        </div>
      </div>

      <AlertDialog open={gameOver}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Game Over!</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="text-center space-y-4">
            <p>Final Score: {score}</p>
            <p>High Score: {highScore}</p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default NetworkDefenseGame;
