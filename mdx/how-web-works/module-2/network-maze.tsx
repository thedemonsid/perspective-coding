import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Shield,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
}

const INITIAL_GAME_STATE: GameState = {
  score: 0,
  level: 1,
  timeLeft: 30,
  isShielded: false,
  gameOver: false,
  highScore: 0,
};

const PowerUpIcon = ({ type }: { type: PowerUp["type"] }) => {
  const icons = {
    shield: <Shield className="w-4 h-4 text-blue-400" />,
    time: <Clock className="w-4 h-4 text-green-400" />,
    score: <Star className="w-4 h-4 text-yellow-400" />,
  };
  return icons[type];
};

const NetworkMazeGame = () => {
  const [packetPosition, setPacketPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [windowWidth, setWindowWidth] = useState(0);
  const [trail, setTrail] = useState<Position[]>([]);
  const [obstacles, setObstacles] = useState<Position[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  const gridSize = windowWidth < 640 ? 6 : 8;
  const cellSize = windowWidth < 640 ? 40 : 50;

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateLevel = useCallback(() => {
    const newObstacles: Position[] = [];
    const newPowerUps: PowerUp[] = [];
    const numObstacles = Math.min(
      gameState.level + 2,
      Math.floor(gridSize * gridSize * 0.2)
    );
    const powerUpTypes: PowerUp["type"][] = ["shield", "time", "score"];

    const isPositionTaken = (pos: Position) => {
      return (
        (pos.x === 0 && pos.y === 0) ||
        (pos.x === gridSize - 1 && pos.y === gridSize - 1) ||
        newObstacles.some((obs) => obs.x === pos.x && obs.y === pos.y) ||
        newPowerUps.some((pup) => pup.x === pos.x && pup.y === pos.y)
      );
    };

    const getRandomPosition = (): Position => ({
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    });

    // Generate obstacles
    for (let i = 0; i < numObstacles; i++) {
      let position: Position;
      do {
        position = getRandomPosition();
      } while (isPositionTaken(position));
      newObstacles.push(position);
    }

    // Generate power-ups
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
  }, [gameState.level, gridSize]);

  useEffect(() => {
    generateLevel();
  }, [generateLevel]);

  useEffect(() => {
    if (gameState.timeLeft > 0 && !gameState.gameOver) {
      const timer = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
          gameOver: prev.timeLeft <= 1,
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState.timeLeft, gameState.gameOver]);

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
      if (gameState.gameOver) return;

      const moves = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
      };

      setPacketPosition((prev) => {
        const newPos = {
          x: Math.max(0, Math.min(gridSize - 1, prev.x + moves[direction].x)),
          y: Math.max(0, Math.min(gridSize - 1, prev.y + moves[direction].y)),
        };

        // Handle collisions and power-ups
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

        // Handle power-ups
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

        // Handle reaching destination
        if (newPos.x === gridSize - 1 && newPos.y === gridSize - 1) {
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
    [gameState.gameOver, gameState.isShielded, gridSize, obstacles, powerUps]
  );

  const renderCell = useCallback(
    (x: number, y: number) => {
      const isPacket = x === packetPosition.x && y === packetPosition.y;
      const isDestination = x === gridSize - 1 && y === gridSize - 1;
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
          style={{ width: cellSize, height: cellSize }}
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
    [
      packetPosition,
      trail,
      obstacles,
      powerUps,
      gameState.isShielded,
      cellSize,
      gridSize,
    ]
  );

  return (
    <Card className="p-4 sm:p-8 w-full max-w-md sm:max-w-2xl mx-auto bg-gradient-to-br from-background/80 to-background/50 border-border/50">
      <div className="flex flex-col items-center space-y-4 sm:space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Network Maze
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Guide the packet home
            </p>
          </div>
          <div className="flex gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="px-2 sm:px-3 py-1 rounded-full bg-primary/10 text-primary">
              Level {gameState.level}
            </div>
            <div className="px-2 sm:px-3 py-1 rounded-full bg-primary/10 text-primary">
              Score: {gameState.score}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="flex justify-between text-sm mb-2">
            <span>Time Left</span>
            <span>{gameState.timeLeft}s</span>
          </div>
          <Progress value={(gameState.timeLeft / 30) * 100} className="h-2" />
        </div>

        <div className="relative p-2 sm:p-4 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-xl">
          <div
            className="grid gap-1 sm:gap-2"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
            }}
          >
            {Array.from({ length: gridSize * gridSize }).map((_, index) => {
              const x = index % gridSize;
              const y = Math.floor(index / gridSize);
              return renderCell(x, y);
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-36 sm:w-48">
          <div />
          <Button
            variant="outline"
            onClick={() => movePacket("up")}
            className="aspect-square p-0 hover:bg-primary/20 touch-manipulation"
            disabled={gameState.gameOver}
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <div />
          <Button
            variant="outline"
            onClick={() => movePacket("left")}
            className="aspect-square p-0 hover:bg-primary/20 touch-manipulation"
            disabled={gameState.gameOver}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => movePacket("down")}
            className="aspect-square p-0 hover:bg-primary/20 touch-manipulation"
            disabled={gameState.gameOver}
          >
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => movePacket("right")}
            className="aspect-square p-0 hover:bg-primary/20 touch-manipulation"
            disabled={gameState.gameOver}
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {gameState.gameOver && (
          <div className="text-center">
            <p className="text-lg font-bold mb-2">Game Over!</p>
            <p className="mb-4">
              Final Score: {gameState.score} | High Score: {gameState.highScore}
            </p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NetworkMazeGame;
