"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Laptop, Wifi, Eye, AlertTriangle, Check, X } from "lucide-react";

interface Device {
  id: number;
  name: string;
  icon: React.ElementType;
  type: string;
  vulnerabilities: string[];
  isCompromised?: boolean;
  hint?: string;
}

const SCENARIOS = [
  {
    title: "Home Network Check",
    devices: [
      {
        id: 1,
        name: "Family Laptop",
        icon: Laptop,
        type: "Computer",
        vulnerabilities: ["outdatedSoftware"],
        hint: "When was the last update installed?",
      },
      {
        id: 2,
        name: "Gaming Console",
        icon: Laptop,
        type: "Entertainment",
        vulnerabilities: [],
        hint: "Looks secure and up to date!",
      },
      {
        id: 3,
        name: "Smart TV",
        icon: Laptop,
        type: "Entertainment",
        vulnerabilities: ["weakPassword"],
        hint: "Is 'password123' really secure?",
      },
      {
        id: 4,
        name: "WiFi Router",
        icon: Wifi,
        type: "Network",
        vulnerabilities: [],
        hint: "Recently updated firmware.",
      },
    ],
    lesson: "Always keep your devices updated and use strong passwords!",
  },
  {
    id: 2,
    title: "Public WiFi Safety",
    devices: [
      {
        id: 1,
        name: "Coffee Shop WiFi",
        icon: Wifi,
        type: "Network",
        vulnerabilities: ["unsecuredNetwork"],
        hint: "No password required... suspicious?",
      },
      {
        id: 2,
        name: "Library Network",
        icon: Wifi,
        type: "Network",
        vulnerabilities: [],
        hint: "Protected with WPA3 encryption.",
      },
      {
        id: 3,
        name: "Free Airport WiFi",
        icon: Wifi,
        type: "Network",
        vulnerabilities: ["manInMiddle"],
        hint: "Multiple networks with similar names...",
      },
    ],
    lesson: "Be careful when connecting to public WiFi networks!",
  },
  // Add more scenarios...
];

const NetworkSecurityGame = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedDevices, setSelectedDevices] = useState<number[]>([]);
  const [gameState, setGameState] = useState<
    "playing" | "checking" | "complete"
  >("playing");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showHints, setShowHints] = useState(false);

  const handleDeviceClick = (deviceId: number) => {
    if (gameState !== "playing") return;

    setSelectedDevices((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const checkAnswers = () => {
    const scenario = SCENARIOS[currentScenario];
    const vulnerableDevices = scenario.devices
      .filter((d) => d.vulnerabilities.length > 0)
      .map((d) => d.id);

    const correctAnswers =
      selectedDevices.every((id) => vulnerableDevices.includes(id)) &&
      selectedDevices.length === vulnerableDevices.length;

    setGameState("checking");
    setFeedback(
      correctAnswers
        ? "Great job! You found all the vulnerable devices!"
        : "Not quite right. Try again!"
    );

    if (correctAnswers) {
      setScore((prev) => prev + 100);
      setTimeout(() => {
        if (currentScenario < SCENARIOS.length - 1) {
          setCurrentScenario((prev) => prev + 1);
          setSelectedDevices([]);
          setGameState("playing");
        } else {
          setGameState("complete");
        }
      }, 2000);
    } else {
      setTimeout(() => {
        setGameState("playing");
      }, 2000);
    }
  };

  return (
    <Card className="w-full max-w-3xl p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Network Detective</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Score: {score}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHints(!showHints)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showHints ? "Hide" : "Show"} Hints
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          Find the vulnerable devices in each scenario!
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Scenario {currentScenario + 1}: {SCENARIOS[currentScenario].title}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {SCENARIOS[currentScenario].devices.map((device) => (
            <div
              key={device.id}
              onClick={() => handleDeviceClick(device.id)}
              className={cn(
                "p-4 rounded-lg border-2 cursor-pointer transition-all",
                "hover:border-primary/50",
                selectedDevices.includes(device.id)
                  ? "border-primary bg-primary/5"
                  : "border-border",
                gameState === "checking" &&
                  device.vulnerabilities.length > 0 &&
                  "border-red-500 bg-red-500/5"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {React.createElement(device.icon, {
                    className: "w-5 h-5 text-primary",
                  })}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{device.name}</h4>
                  <p className="text-sm text-muted-foreground">{device.type}</p>
                  {showHints && (
                    <p className="text-xs text-primary/80 mt-2">
                      💡 {device.hint}
                    </p>
                  )}
                </div>
                {gameState === "checking" && (
                  <div className="w-6 h-6">
                    {device.vulnerabilities.length > 0 ? (
                      <AlertTriangle className="text-red-500" />
                    ) : (
                      <Check className="text-green-500" />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {gameState === "checking" && (
          <div className="text-center p-4 rounded-lg bg-primary/5">
            <p className="font-medium">{feedback}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {SCENARIOS[currentScenario].lesson}
            </p>
          </div>
        )}

        {gameState === "complete" ? (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold">Game Complete! 🎉</h3>
            <p>Final Score: {score}</p>
            <Button
              onClick={() => {
                setCurrentScenario(0);
                setScore(0);
                setSelectedDevices([]);
                setGameState("playing");
              }}
            >
              Play Again
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={checkAnswers}
            disabled={selectedDevices.length === 0 || gameState === "checking"}
          >
            Check Vulnerabilities
          </Button>
        )}
      </div>
    </Card>
  );
};

export default NetworkSecurityGame;
