"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, Search, Server } from "lucide-react";

const DNSExplorer = () => {
  const [domain, setDomain] = useState("");
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState("");

  const simulateDNSLookup = () => {
    setSearching(true);
    setTimeout(() => {
      const ipAddresses: { [key: string]: string } = {
        "google.com": "142.250.190.78",
        "facebook.com": "157.240.241.35",
        "twitter.com": "104.244.42.193",
        "youtube.com": "208.65.153.238",
      };
      setResult(ipAddresses[domain.toLowerCase()] || "192.168.1.1");
      setSearching(false);
    }, 1500);
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center space-y-6">
        <h3 className="text-xl font-bold">DNS Explorer</h3>

        <div className="flex w-full space-x-4">
          <Input
            placeholder="Enter a domain (e.g., google.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <Button onClick={simulateDNSLookup} disabled={!domain || searching}>
            Lookup
          </Button>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col items-center">
            <Globe className="w-12 h-12" />
            <span className="text-sm mt-2">Domain</span>
            <span className="text-xs">{domain}</span>
          </div>

          <motion.div
            animate={
              searching
                ? {
                    x: [0, 100, 0],
                    rotate: [0, 180, 360],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Search
              className={`w-8 h-8 ${
                searching ? "text-blue-500" : "text-gray-400"
              }`}
            />
          </motion.div>

          <div className="flex flex-col items-center">
            <Server className="w-12 h-12" />
            <span className="text-sm mt-2">IP Address</span>
            <span className="text-xs">{result || "---"}</span>
          </div>
        </div>

        <div className="text-center text-sm">
          {searching
            ? "Looking up DNS records..."
            : result
            ? `Found IP address: ${result}`
            : "Enter a domain name to lookup its IP address"}
        </div>
      </div>
    </Card>
  );
};

export default DNSExplorer;
