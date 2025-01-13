"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Smartphone, Search, Check, Shield } from "lucide-react";

const HomeNetworkFinder = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [foundDevices, setFoundDevices] = useState<Array<any>>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [gameComplete, setGameComplete] = useState(false);

  const devices = [
    {
      id: 1,
      name: "Smart Device Hub",
      icon: Smartphone,
      hint: "Your personal command center for digital communication",
      confidence: "99.9% match",
    },
    {
      id: 2,
      name: "Smart Security Camera",
      icon: Search,
      hint: "24/7 surveillance system for your home",
      confidence: "95.5% match",
    },
    {
      id: 3,
      name: "Network Router",
      icon: Shield,
      hint: "Core network infrastructure device",
      confidence: "98.7% match",
    },
    {
      id: 4,
      name: "Smart Thermostat",
      icon: Smartphone,
      hint: "Temperature control system",
      confidence: "97.2% match",
    },
  ];

  const startSearch = () => {
    setSearchActive(true);
    let foundCount = 0;

    // Simulate finding devices one by one
    const interval = setInterval(() => {
      if (foundCount < devices.length) {
        setFoundDevices((prev) => [...prev, devices[foundCount]]);
        foundCount++;
      } else {
        clearInterval(interval);
        setGameComplete(true);
      }
    }, 1000); // Find a new device every second
  };

  const resetSearch = () => {
    setSearchActive(false);
    setFoundDevices([]);
    setGameComplete(false);
  };

  const getProgress = () => {
    return (foundDevices.length / devices.length) * 100;
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="border-b bg-card">
        <CardTitle className="flex justify-between items-center text-card-foreground">
          <span className="flex items-center gap-2">
            <Shield className="text-primary" />
            Network Security Scanner
          </span>
          {searchActive && (
            <span className="font-mono text-muted-foreground">
              {foundDevices.length}/{devices.length} Devices
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-background">
        <div className="space-y-6">
          {searchActive && (
            <div className="w-full bg-secondary/20 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          )}

          {!searchActive ? (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground text-lg">
                Initiate secure network scan to discover connected devices
              </p>
              <button
                onClick={startSearch}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Search className="w-5 h-5" />
                Begin Security Scan
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {devices.map((device) => {
                const isFound = foundDevices.find((id) => id.id === device.id);
                return (
                  <div
                    key={device.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border transition-all duration-300",
                      isFound
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border"
                    )}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 flex items-center justify-center rounded-full",
                        isFound ? "bg-primary/10" : "bg-muted"
                      )}
                    >
                      {React.createElement(device.icon, {
                        className: isFound
                          ? "text-primary"
                          : "text-muted-foreground",
                      })}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">
                        {device.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {device.hint}
                      </p>
                      {isFound && (
                        <p className="text-xs text-primary/90 mt-1">
                          {device.confidence}
                        </p>
                      )}
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center">
                      {isFound ? (
                        <Check className="text-primary w-6 h-6" />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
                      )}
                    </div>
                  </div>
                );
              })}

              {gameComplete && (
                <div className="text-center pt-6">
                  <p className="text-primary mb-4">Network scan complete!</p>
                  <button
                    onClick={resetSearch}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Run New Scan
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeNetworkFinder;
