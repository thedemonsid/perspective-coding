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
    <Card className="p-4 sm:p-6 w-full max-w-2xl mx-auto bg-gradient-to-br from-background to-muted/50">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Data Packet Journey
          </h3>
          <p className="text-sm text-muted-foreground">
            Visualizing how data travels through networks
          </p>
        </div>

        <div className="relative w-full">
          {/* Network Path */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 transform -translate-y-1/2" />

          <div className="flex justify-between items-center w-full px-4 sm:px-8">
            <motion.div
              className="flex flex-col items-center z-10"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-2 sm:p-3 rounded-xl bg-primary/10">
                <Server className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <span className="text-xs sm:text-sm mt-2 font-medium">
                Server
              </span>
            </motion.div>

            <div className="flex-1 relative h-20 flex items-center justify-center">
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
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/20" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              className="flex flex-col items-center z-10"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-2 sm:p-3 rounded-xl bg-primary/10">
                <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <span className="text-xs sm:text-sm mt-2 font-medium">
                Device
              </span>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={createPacket}
            disabled={packets.length >= 4}
            className="relative group"
            variant="outline"
          >
            <span className="relative z-10">Create Packet</span>
            <div className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-md" />
          </Button>

          <Button
            onClick={() => setStep((prev) => prev + 1)}
            disabled={step >= 3 || packets.length === 0}
            className="bg-primary"
          >
            Send Packets
          </Button>

          <Button
            onClick={() => {
              setStep(0);
              setPackets([]);
            }}
            variant="ghost"
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            Reset
          </Button>
        </div>

        <motion.div
          className="text-sm text-center px-4 py-2 rounded-full bg-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={step}
        >
          {step === 0 && "Create packets to send data"}
          {step === 1 && "Packets are traveling through the network..."}
          {step === 2 && "Packets are being reassembled..."}
          {step === 3 && "Data received successfully! 🎉"}
        </motion.div>
      </div>
    </Card>
  );
};

export default PacketJourneyDemo;
