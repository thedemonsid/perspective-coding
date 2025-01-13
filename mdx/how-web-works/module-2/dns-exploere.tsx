"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, Server, Search, ArrowRight, RefreshCw } from "lucide-react";

const DNSExplorer = () => {
  const [domain, setDomain] = useState("");
  const [isResolving, setIsResolving] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const dnsSteps = [
    {
      title: "Local DNS Cache",
      description: "Checking if the IP is already known...",
      server: "Local Computer",
      duration: 1000,
    },
    {
      title: "DNS Resolver",
      description: "Asking your ISP's DNS server...",
      server: "ISP DNS",
      duration: 1500,
    },
    {
      title: "Root DNS",
      description: "Consulting root servers for direction...",
      server: "Root Server",
      duration: 1500,
    },
    {
      title: "TLD Server",
      description: "Finding the top-level domain server...",
      server: "TLD Server",
      duration: 1500,
    },
    {
      title: "Authoritative DNS",
      description: "Getting the final IP address...",
      server: "Auth Server",
      duration: 1500,
    },
  ];

  const mockIPs: { [key: string]: string } = {
    "google.com": "142.250.190.78",
    "youtube.com": "208.65.153.238",
    "facebook.com": "157.240.3.35",
    "github.com": "140.82.121.3",
  };

  const startResolution = () => {
    if (!domain) return;
    setIsResolving(true);
    setCurrentStep(0);
    setShowResult(false);

    let step = 0;
    const processSteps = () => {
      if (step < dnsSteps.length) {
        setCurrentStep(step);
        setTimeout(() => {
          step++;
          processSteps();
        }, dnsSteps[step].duration);
      } else {
        setShowResult(true);
        setIsResolving(false);
      }
    };

    processSteps();
  };

  const getRandomIP = () => {
    const nums = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 256)
    );
    return nums.join(".");
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="flex gap-4">
          <Input
            placeholder="Enter a domain (e.g., google.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            disabled={isResolving}
          />
          <Button onClick={startResolution} disabled={!domain || isResolving}>
            {isResolving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Search className="w-4 h-4 mr-2" />
            )}
            Resolve
          </Button>
        </div>

        <div className="relative h-64 border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6" />
              <span>Your Computer</span>
            </div>
            <ArrowRight className="w-4 h-4" />
            <div className="flex items-center gap-2">
              <Server className="w-6 h-6" />
              <span>DNS System</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isResolving && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-4"
              >
                <h3 className="text-lg font-semibold">
                  {dnsSteps[currentStep].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {dnsSteps[currentStep].description}
                </p>
                <div className="flex justify-center items-center gap-4">
                  <Server className="w-8 h-8 text-primary animate-pulse" />
                  <span className="text-sm font-mono">
                    {dnsSteps[currentStep].server}
                  </span>
                </div>
              </motion.div>
            )}

            {showResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <h3 className="text-lg font-semibold text-green-600">
                  Resolution Complete!
                </h3>
                <div className="font-mono text-sm">
                  {domain} → {mockIPs[domain.toLowerCase()] || getRandomIP()}
                </div>
                <p className="text-sm text-muted-foreground">
                  Resolution completed in{" "}
                  {dnsSteps.reduce((acc, step) => acc + step.duration, 0) /
                    1000}{" "}
                  seconds
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
};

export default DNSExplorer;
