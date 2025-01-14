"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Shield,
  Clock,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Server,
  Pause,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Previous interfaces remain the same
interface Position {
  x: number;
  y: number;
}

interface PowerUp extends Position {
  type: "shield" | "time" | "score";
}

interface GameState {
  score: number;
  level: number;
  timeLeft: number;
  isShielded: boolean;
  gameOver: boolean;
  highScore: number;
  isPaused: boolean;
}

const INITIAL_GAME_STATE: GameState = {
  score: 0,
  level: 1,
  timeLeft: 30,
  isShielded: false,
  gameOver: false,
  highScore: 0,
  isPaused: false,
};

const GRID_SIZE = 8;
const CELL_SIZE = 50;

// Helper Components
const PowerUpIcon = ({ type }: { type: PowerUp["type"] }) => {
  const icons = {
    shield: <Shield className="w-4 h-4 text-blue-400" />,
    time: <Clock className="w-4 h-4 text-green-400" />,
    score: <Star className="w-4 h-4 text-yellow-400" />,
  };
  return icons[type];
};

const ServerIcon = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <Server className="w-6 h-6 text-green-400 animate-pulse" />
  </div>
);

const ObstacleIcon = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-4 h-4 bg-red-500/20 rounded-full border border-red-500/40" />
  </div>
);

const NetworkMazeGame = () => {
  // State management remains the same
  const [packetPosition, setPacketPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [trail, setTrail] = useState<Position[]>([]);
  const [obstacles, setObstacles] = useState<Position[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  // Game logic functions remain the same
  const generateLevel = useCallback(() => {
    const newObstacles: Position[] = [];
    const newPowerUps: PowerUp[] = [];
    const numObstacles = Math.min(
      gameState.level + 2,
      Math.floor(GRID_SIZE * GRID_SIZE * 0.2)
    );
    const powerUpTypes: PowerUp["type"][] = ["shield", "time", "score"];

    const isPositionTaken = (pos: Position) => {
      return (
        (pos.x === 0 && pos.y === 0) ||
        (pos.x === GRID_SIZE - 1 && pos.y === GRID_SIZE - 1) ||
        newObstacles.some((obs) => obs.x === pos.x && obs.y === pos.y) ||
        newPowerUps.some((pup) => pup.x === pos.x && pup.y === pos.y)
      );
    };

    const getRandomPosition = (): Position => ({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    });

    for (let i = 0; i < numObstacles; i++) {
      let position: Position;
      do {
        position = getRandomPosition();
      } while (isPositionTaken(position));
      newObstacles.push(position);
    }

    for (let i = 0; i < 2; i++) {
      let position: Position;
      do {
        position = getRandomPosition();
      } while (isPositionTaken(position));
      newPowerUps.push({
        ...position,
        type: powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)],
      });
    }

    setObstacles(newObstacles);
    setPowerUps(newPowerUps);
    setGameState((prev) => ({ ...prev, timeLeft: 30 }));
  }, [gameState.level]);

  useEffect(() => {
    generateLevel();
  }, [generateLevel]);

  useEffect(() => {
    if (gameState.timeLeft > 0 && !gameState.gameOver && !gameState.isPaused) {
      const timer = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
          gameOver: prev.timeLeft <= 1,
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState.timeLeft, gameState.gameOver, gameState.isPaused]);

  const resetGame = useCallback(() => {
    setPacketPosition({ x: 0, y: 0 });
    setTrail([]);
    setGameState((prev) => ({
      ...INITIAL_GAME_STATE,
      highScore: prev.highScore,
    }));
  }, []);

  const movePacket = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      if (gameState.gameOver || gameState.isPaused) return;

      const moves = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
      };

      setPacketPosition((prev) => {
        const newPos = {
          x: Math.max(0, Math.min(GRID_SIZE - 1, prev.x + moves[direction].x)),
          y: Math.max(0, Math.min(GRID_SIZE - 1, prev.y + moves[direction].y)),
        };

        const hitObstacle = obstacles.some(
          (obs) => obs.x === newPos.x && obs.y === newPos.y
        );
        if (hitObstacle && !gameState.isShielded) {
          setGameState((prev) => ({
            ...prev,
            gameOver: true,
            highScore: Math.max(prev.highScore, prev.score),
          }));
          return prev;
        }

        const powerUp = powerUps.find(
          (pup) => pup.x === newPos.x && pup.y === newPos.y
        );
        if (powerUp) {
          setPowerUps((prev) =>
            prev.filter((p) => p.x !== powerUp.x || p.y !== powerUp.y)
          );
          switch (powerUp.type) {
            case "shield":
              setGameState((prev) => ({ ...prev, isShielded: true }));
              setTimeout(
                () => setGameState((prev) => ({ ...prev, isShielded: false })),
                5000
              );
              break;
            case "time":
              setGameState((prev) => ({
                ...prev,
                timeLeft: Math.min(prev.timeLeft + 10, 30),
              }));
              break;
            case "score":
              setGameState((prev) => ({ ...prev, score: prev.score + 50 }));
              break;
          }
        }

        if (newPos.x === GRID_SIZE - 1 && newPos.y === GRID_SIZE - 1) {
          setGameState((prev) => ({
            ...prev,
            score: prev.score + 100 + Math.floor(prev.timeLeft * prev.level),
            level: prev.level + 1,
          }));
          setTrail([]);
          return { x: 0, y: 0 };
        }

        setTrail((prev) => [...prev, { x: newPos.x, y: newPos.y }]);
        return newPos;
      });
    },
    [
      gameState.gameOver,
      gameState.isShielded,
      gameState.isPaused,
      obstacles,
      powerUps,
    ]
  );

  const renderCell = useCallback(
    (x: number, y: number) => {
      const isPacket = x === packetPosition.x && y === packetPosition.y;
      const isDestination = x === GRID_SIZE - 1 && y === GRID_SIZE - 1;
      const isTrail = trail.some((pos) => pos.x === x && pos.y === y);
      const isObstacle = obstacles.some((obs) => obs.x === x && obs.y === y);
      const powerUp = powerUps.find((pup) => pup.x === x && pup.y === y);

      return (
        <motion.div
          key={`${x}-${y}`}
          className={cn(
            "relative rounded-lg backdrop-blur-sm border border-border/50",
            isDestination &&
              "bg-gradient-to-br from-green-400/20 to-green-600/20",
            isTrail && "bg-gradient-to-br from-primary/10 to-primary/5",
            isObstacle && "bg-gradient-to-br from-red-500/20 to-red-700/20"
          )}
          style={{ width: CELL_SIZE, height: CELL_SIZE }}
          initial={false}
          animate={{ scale: isPacket ? 1.1 : 1 }}
        >
          <AnimatePresence>
            {isPacket && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <div className="relative w-4 h-4">
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full shadow-lg",
                      gameState.isShielded
                        ? "bg-gradient-to-r from-blue-400 to-blue-600"
                        : "bg-gradient-to-r from-primary to-primary/80"
                    )}
                  />
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" />
                </div>
              </motion.div>
            )}
            {isDestination && <ServerIcon />}
            {isObstacle && <ObstacleIcon />}
            {powerUp && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <PowerUpIcon type={powerUp.type} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    },
    [packetPosition, trail, obstacles, powerUps, gameState.isShielded]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.gameOver || gameState.isPaused) return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          movePacket("up");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          movePacket("down");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          movePacket("left");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          movePacket("right");
          break;
        case " ":
          togglePause();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState.gameOver, gameState.isPaused, movePacket]);

  const togglePause = () => {
    setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  };

  // Improved control button component
  const ControlButton = ({
    direction,
    icon: Icon,
    label,
    className,
  }: {
    direction: "up" | "down" | "left" | "right";
    icon: any;
    label: string;
    className?: string;
  }) => (
    <Button
      variant="outline"
      onClick={() => movePacket(direction)}
      className={cn(
        "w-full touch-manipulation active:scale-95",
        "transition-transform duration-100",
        "focus-visible:ring-1 focus-visible:ring-primary",
        className
      )}
      disabled={gameState.gameOver || gameState.isPaused}
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </Button>
  );

  return (
    <Card className="relative w-full h-[calc(100vh-4rem)] flex flex-col bg-gradient-to-br from-background/80 to-background/50 border-border/50">
      {/* Compact Header */}
      <div className="flex-none px-3 py-2 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-primary">
              Network Maze
            </h3>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span>Level {gameState.level}</span>
              <span>•</span>
              <span>Score: {gameState.score}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={togglePause}
            className="h-8 w-8"
          >
            {gameState.isPaused ? (
              <Play className="h-4 w-4" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Compact Timer */}
        <div className="mt-2">
          <Progress value={(gameState.timeLeft / 30) * 100} className="h-1" />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-muted-foreground">
              {gameState.timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Game Area - Auto-sizing */}
      <div className="flex-1 min-h-0 flex items-center justify-center p-2">
        <div className="relative bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-lg p-1">
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, ${CELL_SIZE}px))`,
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              return renderCell(x, y);
            })}
          </div>
        </div>
      </div>

      {/* Fixed Controls at Bottom */}
      <div className="flex-none p-3 md:hidden">
        <div className="max-w-[180px] mx-auto">
          <div className="grid grid-cols-3 gap-2">
            {/* Top row */}
            <div className="col-start-2">
              <ControlButton
                direction="up"
                icon={ArrowUp}
                label="Move Up"
                className="h-12"
              />
            </div>

            {/* Middle row */}
            <ControlButton
              direction="left"
              icon={ArrowLeft}
              label="Move Left"
              className="h-12"
            />
            <ControlButton
              direction="down"
              icon={ArrowDown}
              label="Move Down"
              className="h-12"
            />
            <ControlButton
              direction="right"
              icon={ArrowRight}
              label="Move Right"
              className="h-12"
            />
          </div>
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {(gameState.isPaused || gameState.gameOver) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center p-4">
              {gameState.gameOver ? (
                <>
                  <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
                  <p className="text-muted-foreground mb-4">
                    Final Score: {gameState.score}
                    <br />
                    High Score: {gameState.highScore}
                  </p>
                  <Button onClick={resetGame} size="lg">
                    Play Again
                  </Button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-4">Paused</h2>
                  <Button onClick={togglePause} size="lg">
                    Resume
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default NetworkMazeGame;
