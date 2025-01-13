"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Packet {
  id: number;
  destination: string;
  route: string;
}

const DESTINATIONS = ["Server A", "Server B", "Server C"] as const;
const ROUTES = ["Route 1", "Route 2", "Route 3"] as const;

const PacketRoutingGame = () => {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [timeLeft, gameActive]);

  useEffect(() => {
    if (gameActive && packets.length < 3) {
      const interval = setInterval(() => {
        setPackets((prev) =>
          [
            ...prev,
            {
              id: Math.random(),
              destination:
                DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)],
              route: ROUTES[Math.floor(Math.random() * ROUTES.length)],
              position: 0,
            },
          ].slice(-3)
        );
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [packets, gameActive]);

  const handleRouteClick = (packet: Packet, selectedRoute: string) => {
    setPackets((prev) => prev.filter((p) => p.id !== packet.id));
    if (packet.route === selectedRoute) {
      setScore((prev) => prev + 10);
    }
  };

  const resetGame = () => {
    setPackets([]);
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Packet Router</span>
          <div className="flex gap-4">
            <span>Score: {score}</span>
            <span>Time: {timeLeft}s</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {gameActive ? (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {DESTINATIONS.map((dest, i) => (
                  <div
                    key={i}
                    className="p-2 bg-blue-100 rounded-lg text-center"
                  >
                    {dest}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {packets.map((packet) => (
                  <div key={packet.id} className="flex items-center gap-4">
                    <div className="w-32 p-2 bg-green-100 rounded-lg text-center">
                      Packet to {packet.destination}
                    </div>
                    <ArrowRight className="text-gray-400" />
                    <div className="flex gap-2 flex-1">
                      {ROUTES.map((route) => (
                        <button
                          key={route}
                          onClick={() => handleRouteClick(packet, route)}
                          className="flex-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          {route}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">Game Over!</h3>
              <p>Final Score: {score}</p>
              <button
                onClick={resetGame}
                className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <RefreshCw className="w-4 h-4" /> Play Again
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PacketRoutingGame;
