"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

interface Packet {
  id: string;
  protocol: "HTTP" | "FTP" | "DNS" | "SMTP";
}

const PROTOCOLS = {
  HTTP: {
    color: "bg-blue-500",
    port: 80,
    description: "Web Traffic",
    icon: "🌐",
  },
  FTP: {
    color: "bg-green-500",
    port: 21,
    description: "File Transfer",
    icon: "📁",
  },
  DNS: {
    color: "bg-yellow-500",
    port: 53,
    description: "Domain Names",
    icon: "🔍",
  },
  SMTP: {
    color: "bg-red-500",
    port: 25,
    description: "Email",
    icon: "📧",
  },
};

const PacketExpress = () => {
  const [score, setScore] = useState(0);
  const [currentPacket, setCurrentPacket] = useState<Packet | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const [feedback, setFeedback] = useState("");

  const generatePacket = () => {
    const protocols = Object.keys(PROTOCOLS) as Array<keyof typeof PROTOCOLS>;
    const randomProtocol =
      protocols[Math.floor(Math.random() * protocols.length)];
    return {
      id: Math.random().toString(),
      protocol: randomProtocol,
    };
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setCurrentPacket(generatePacket());
  };

  const handleProtocolSelect = (selectedProtocol: keyof typeof PROTOCOLS) => {
    if (!currentPacket) return;

    if (selectedProtocol === currentPacket.protocol) {
      setScore((prev) => prev + 10);
      setFeedback("Correct! ✅");
    } else {
      setScore((prev) => Math.max(0, prev - 5));
      setFeedback(`Wrong! That was a ${currentPacket.protocol} packet ❌`);
    }

    setTimeout(() => {
      setCurrentPacket(generatePacket());
      setFeedback("");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Packet Router</span>
          <Badge variant="secondary">Score: {score}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!gameActive ? (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Learn Network Protocols</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(PROTOCOLS).map(([protocol, info]) => (
                <div key={protocol} className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <span>{info.icon}</span>
                    <span className="font-bold">{protocol}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Port: {info.port}
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={startGame}>Start Game</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {currentPacket && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center p-4"
              >
                <Package className="w-16 h-16 mx-auto mb-2" />
                <div className="text-lg font-bold">Route this packet!</div>
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(PROTOCOLS).map(([protocol, info]) => (
                <Button
                  key={protocol}
                  onClick={() =>
                    handleProtocolSelect(protocol as keyof typeof PROTOCOLS)
                  }
                  className={`${info.color} text-white h-20`}
                >
                  <div>
                    <div className="text-lg">{info.icon}</div>
                    <div>{protocol}</div>
                  </div>
                </Button>
              ))}
            </div>

            {feedback && (
              <div className="text-center font-bold text-lg">{feedback}</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PacketExpress;
