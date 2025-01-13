"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";

const SecretMessageEncoder = () => {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState(3); // Simple Caesar cipher shift
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [showDecoded, setShowDecoded] = useState(false);

  const encode = (text: string, shift: number) => {
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const base = code >= 97 ? 97 : 65;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
      })
      .join("");
  };

  const handleEncode = () => {
    const encodedText = encode(message, key);
    setEncoded(encodedText);
    setDecoded(message);
    setShowDecoded(false);
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="flex flex-col space-y-6">
        <h3 className="text-xl font-bold text-center">
          Secret Message Encoder
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">
              Your Message
            </label>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your secret message"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">
              Encryption Key (1-25)
            </label>
            <Input
              type="number"
              min="1"
              max="25"
              value={key}
              onChange={(e) => setKey(parseInt(e.target.value) || 0)}
              className="mt-1"
            />
          </div>

          <Button onClick={handleEncode} className="w-full" disabled={!message}>
            <Lock className="w-4 h-4 mr-2" />
            Encode Message
          </Button>
        </div>

        {encoded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-4 rounded-lg bg-primary/5">
              <label className="text-sm text-muted-foreground">
                Encoded Message
              </label>
              <p className="font-mono mt-1">{encoded}</p>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowDecoded(!showDecoded)}
              className="w-full"
            >
              <Unlock className="w-4 h-4 mr-2" />
              {showDecoded ? "Hide" : "Decode"} Message
            </Button>

            {showDecoded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-lg bg-green-500/5"
              >
                <label className="text-sm text-muted-foreground">
                  Decoded Message
                </label>
                <p className="font-mono mt-1">{decoded}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-semibold">How it works:</p>
          <p>
            This demo uses a Caesar cipher - each letter in your message is
            shifted forward in the alphabet by the number specified in the
            encryption key. For example, with a key of 3:
          </p>
          <p className="font-mono mt-1">A → D, B → E, C → F, etc.</p>
        </div>
      </div>
    </Card>
  );
};

export default SecretMessageEncoder;
