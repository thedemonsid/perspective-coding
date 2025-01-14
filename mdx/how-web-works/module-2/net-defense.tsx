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
import {
  Bug,
  Shield,
  Lock,
  Wifi,
  Pause,
  Play,
  RefreshCw,
  KeyRound,
  Fingerprint,
  ShieldAlert,
} from "lucide-react";

interface Threat {
  id: number;
  position: number;
  type: string;
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
  description: string;
  effectiveAgainst: string[];
}

const INITIAL_RESOURCES = 100;
const INITIAL_HEALTH = 100;
const GRID_SIZE = 6;
const THREAT_SPEED = 3000;

const defenseTypes: Record<string, DefenseType> = {
  firewall: {
    cost: 20,
    icon: Shield,
    name: "Firewall",
    description: "Blocks unauthorized access attempts",
    effectiveAgainst: ["malware", "bruteforce"],
  },
  encryption: {
    cost: 30,
    icon: Lock,
    name: "Encryption",
    description: "Protects sensitive data",
    effectiveAgainst: ["dataTheft", "mitm"],
  },
  authentication: {
    cost: 25,
    icon: Fingerprint,
    name: "Authentication",
    description: "Verifies user identity",
    effectiveAgainst: ["bruteforce", "phishing"],
  },
  antivirus: {
    cost: 35,
    icon: Bug,
    name: "Antivirus",
    description: "Detects and removes malware",
    effectiveAgainst: ["malware", "virus"],
  },
};

const threatTypes = {
  malware: { icon: Bug, name: "Malware", color: "bg-red-500" },
  bruteforce: { icon: KeyRound, name: "Brute Force", color: "bg-yellow-500" },
  dataTheft: { icon: ShieldAlert, name: "Data Theft", color: "bg-purple-500" },
  mitm: { icon: Wifi, name: "Man in the Middle", color: "bg-orange-500" },
  phishing: { icon: ShieldAlert, name: "Phishing", color: "bg-blue-500" },
  virus: { icon: Bug, name: "Virus", color: "bg-green-500" },
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
  const [level, setLevel] = useState(1);
  const [successfulBlocks, setSuccessfulBlocks] = useState(0);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const healthRef = useRef(networkHealth);
  const [showTutorial, setShowTutorial] = useState(true);

  // Update ref when health changes
  useEffect(() => {
    healthRef.current = networkHealth;
  }, [networkHealth]);

  const generateThreat = useCallback((): Threat => {
    const threatTypeKeys = Object.keys(threatTypes);
    const randomType =
      threatTypeKeys[Math.floor(Math.random() * threatTypeKeys.length)];

    return {
      id: Date.now(),
      position: Math.floor(Math.random() * GRID_SIZE),
      type: randomType,
      damage: 10 + Math.floor(level / 2),
    };
  }, [level]);

  const spawnThreat = useCallback(() => {
    setThreats((prev) => [...prev, generateThreat()]);
  }, [generateThreat]);

  const handleCollision = useCallback(
    (threat: Threat, wasBlocked: boolean) => {
      setThreats((prev) => prev.filter((t) => t.id !== threat.id));

      if (wasBlocked) {
        setScore((prev) => prev + 10);
        setSuccessfulBlocks((prev) => prev + 1);
        setResources((prev) => Math.min(prev + 5, INITIAL_RESOURCES)); // Reward for successful block

        // Level up every 10 successful blocks
        if ((successfulBlocks + 1) % 10 === 0) {
          setLevel((prev) => prev + 1);
        }
      } else {
        setNetworkHealth((prev) => Math.max(0, prev - threat.damage));
      }
    },
    [successfulBlocks]
  );

  const isDefenseEffective = (defenseType: string, threatType: string) => {
    return defenseTypes[defenseType].effectiveAgainst.includes(threatType);
  };

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
    setLevel(1);
    setSuccessfulBlocks(0);
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
        handleCollision(threat, false);
      }
    });
  }, [threats, defenses, handleCollision]);

  useEffect(() => {
    if (networkHealth <= 0) {
      setGameOver(true);
      setHighScore((prev) => Math.max(prev, score));
    }
  }, [networkHealth, score]);

  const TutorialOverlay = ({ onClose }: { onClose: () => void }) => (
    <div className="absolute inset-0 bg-black/80 z-50 text-white p-4 sm:p-8 rounded-lg overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold">How to Play</h3>

        <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 shrink-0 flex items-center justify-center">
              1️⃣
            </div>
            <p>
              Select a defense type from the bottom menu. Each defense is
              effective against specific threats:
            </p>
            <ul className="list-disc pl-4">
              <li>🛡️ Firewall - Blocks malware and brute force attacks</li>
              <li>
                �� Encryption - Stops data theft and man-in-the-middle attacks
              </li>
              <li>
                👆 Authentication - Prevents brute force and phishing attempts
              </li>
              <li> Antivirus - Eliminates malware and viruses</li>
            </ul>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 shrink-0 flex items-center justify-center">
              2️⃣
            </div>
            <p>
              Place defenses on the grid by clicking empty positions. Each
              defense costs resources to deploy.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 shrink-0 flex items-center justify-center">
              3️⃣
            </div>
            <p>
              Threats will appear randomly on the grid. If a threat meets its
              matching defense, it will be blocked!
            </p>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 shrink-0 flex items-center justify-center">
              4️⃣
            </div>
            <p>
              Manage your resources wisely! You earn resources for successful
              blocks but lose network health for missed threats.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 shrink-0 flex items-center justify-center">
              5️⃣
            </div>
            <p>
              Level up by successfully blocking threats. Each level brings
              faster and stronger threats!
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={onClose} className="w-full">
            Start Playing!
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="h-full w-full max-w-3xl mx-auto p-2 sm:p-6 relative">
      {showTutorial && (
        <TutorialOverlay onClose={() => setShowTutorial(false)} />
      )}

      <div className="space-y-4 sm:space-y-6">
        {/* Game Header - More compact on mobile */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-lg sm:text-xl font-bold">
              Network Defense Simulator
            </h2>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Level {level}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowTutorial(true)}
              className="text-xs sm:text-sm"
            >
              How to Play
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPaused(!paused)}
              className="px-2"
            >
              {paused ? (
                <Play className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={resetGame}
              className="px-2"
            >
              <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>

        {/* Stats - Stack on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
          <div className="space-y-1 sm:space-y-2">
            <div className="text-xs sm:text-sm font-medium">Resources</div>
            <Progress
              value={resources}
              max={INITIAL_RESOURCES}
              className="h-2"
            />
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div className="text-xs sm:text-sm font-medium">Network Health</div>
            <Progress
              value={networkHealth}
              max={INITIAL_HEALTH}
              className="h-2"
            />
          </div>
          <div className="col-span-2 sm:col-span-1 space-y-1 sm:space-y-2">
            <div className="text-xs sm:text-sm font-medium">Score: {score}</div>
            <div className="text-xs text-muted-foreground">
              High Score: {highScore}
            </div>
          </div>
        </div>

        {/* Game Grid - Adjust size and spacing */}
        <div className="grid grid-cols-6 gap-1 sm:gap-4 aspect-[2/1]">
          {Array.from({ length: GRID_SIZE }).map((_, index) => (
            <button
              key={index}
              onClick={() => placeDefense(index)}
              className="relative border-2 border-dashed border-muted rounded-lg hover:border-primary/50 transition-colors"
              onMouseEnter={() => setTooltip(`Position ${index + 1}`)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Threats - Adjust size for mobile */}
              {threats.map(
                (threat) =>
                  threat.position === index && (
                    <div
                      key={threat.id}
                      className={`absolute inset-0 m-auto h-6 w-6 sm:h-8 sm:w-8 rounded-full ${
                        threatTypes[threat.type as keyof typeof threatTypes]
                          .color
                      } flex items-center justify-center`}
                    >
                      {React.createElement(
                        threatTypes[threat.type as keyof typeof threatTypes]
                          .icon,
                        {
                          className: "w-3 h-3 sm:w-4 sm:h-4 text-white",
                        }
                      )}
                    </div>
                  )
              )}

              {/* Defenses - Adjust size for mobile */}
              {defenses.map(
                (defense, idx) =>
                  defense.position === index && (
                    <div
                      key={idx}
                      className="absolute inset-0 m-auto h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary/20 flex items-center justify-center"
                    >
                      {React.createElement(defenseTypes[defense.type].icon, {
                        className: "w-3 h-3 sm:w-4 sm:h-4 text-primary",
                      })}
                    </div>
                  )
              )}
            </button>
          ))}
        </div>

        {/* Defense Selection - Stack on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {Object.entries(defenseTypes).map(
            ([key, { icon: Icon, cost, name, description }]) => (
              <Button
                key={key}
                variant={selectedDefense === key ? "default" : "outline"}
                onClick={() => setSelectedDefense(key)}
                disabled={resources < cost}
                className="flex flex-col gap-1 h-auto py-1 sm:py-2 text-xs sm:text-sm"
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-medium">{name}</span>
                <span className="text-muted-foreground">Cost: {cost}</span>
              </Button>
            )
          )}
        </div>

        {/* Help Text - Adjust font size */}
        <div className="text-xs sm:text-sm text-muted-foreground text-center">
          {selectedDefense && (
            <p>{defenseTypes[selectedDefense].description}</p>
          )}
        </div>
      </div>

      {/* Tutorial Overlay - Make it scrollable on mobile */}
      <AlertDialog open={gameOver}>
        <AlertDialogContent className="max-h-[90vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl">
              Game Over!
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-base sm:text-lg font-medium">
                Final Score: {score}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                High Score: {highScore}
              </p>
              <p className="text-xs sm:text-sm">You reached Level {level}</p>
            </div>
            <div className="flex justify-center">
              <Button onClick={resetGame}>Play Again</Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default NetworkDefenseGame;
