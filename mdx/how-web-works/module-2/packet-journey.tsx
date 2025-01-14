"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Smartphone } from "lucide-react";

const PacketJourneyDemo = () => {
  const [step, setStep] = useState(0);
  const [packets, setPackets] = useState<{ id: number }[]>([]);

  const createPacket = () => {
    if (packets.length < 4) {
      setPackets([...packets, { id: packets.length }]);
    }
  };

  return (
    <Card className="min-h-[calc(100svh-4rem)] flex flex-col bg-gradient-to-br from-background to-muted/50 p-3 my-16">
      {/* Header Section */}
      <div className="shrink-0 p-3 border-b border-border/50">
        <p className="text-xs text-muted-foreground">
          Visualizing how data travels through networks
        </p>
      </div>

      {/* Network Path - Main Content */}
      <div className="grow flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 transform -translate-y-1/2" />

          <div className="flex justify-between items-center w-full">
            {/* Server Icon */}
            <motion.div
              className="flex flex-col items-center z-10"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Server className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs mt-1 font-medium">Server</span>
            </motion.div>

            {/* Packets Animation */}
            <div className="flex-1 relative h-14 flex items-center justify-center">
              <AnimatePresence>
                {packets.map((packet, index) => (
                  <motion.div
                    key={packet.id}
                    className="absolute"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{
                      x: step * 100 - 50,
                      opacity: 1,
                      scale: [1, 1.2, 1],
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/20" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Device Icon */}
            <motion.div
              className="flex flex-col items-center z-10"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs mt-1 font-medium">Device</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="shrink-0 p-3 border-t border-border/50 space-y-3">
        {/* Status Message */}
        <motion.div
          className="text-xs text-center px-3 py-1.5 rounded-full bg-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={step}
        >
          {step === 0 && "Create packets to send data"}
          {step === 1 && "Packets are traveling through the network..."}
          {step === 2 && "Packets are being reassembled..."}
          {step === 3 && "Data received successfully! 🎉"}
        </motion.div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-2">
          <Button
            onClick={createPacket}
            disabled={packets.length >= 4}
            className="h-8 text-xs"
            variant="outline"
          >
            Create Packet
          </Button>

          <Button
            onClick={() => setStep((prev) => prev + 1)}
            disabled={step >= 3 || packets.length === 0}
            className="h-8 text-xs bg-primary"
          >
            Send
          </Button>

          <Button
            onClick={() => {
              setStep(0);
              setPackets([]);
            }}
            variant="ghost"
            className="h-8 text-xs hover:bg-destructive/10 hover:text-destructive"
          >
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PacketJourneyDemo;
