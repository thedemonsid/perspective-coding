"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Globe,
  Server,
  Laptop,
  Smartphone,
  GamepadIcon,
  MonitorPlay,
  Home,
  Plus,
  Trash2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface DNSRecord {
  id: string;
  name: string;
  ip: string;
  type: "device" | "website";
  icon: keyof typeof deviceIcons;
}

const deviceIcons = {
  laptop: Laptop,
  smartphone: Smartphone,
  gaming: GamepadIcon,
  tv: MonitorPlay,
  website: Globe,
  server: Server,
  home: Home,
};

const DNSPlayground = () => {
  const [records, setRecords] = useState<DNSRecord[]>([
    {
      id: "home",
      name: "home.network",
      ip: "192.168.1.1",
      type: "device",
      icon: "home",
    },
  ]);
  const [newName, setNewName] = useState("");
  const [selectedIcon, setSelectedIcon] =
    useState<keyof typeof deviceIcons>("laptop");
  const [isQuerying, setIsQuerying] = useState(false);
  const [queryResult, setQueryResult] = useState<DNSRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const generateIP = () => {
    const segments = [192, 168, 1];
    const lastSegment = Math.floor(Math.random() * 254) + 1;
    return [...segments, lastSegment].join(".");
  };

  const handleAddRecord = () => {
    if (!newName) return;

    const newRecord: DNSRecord = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName.toLowerCase().endsWith(".network")
        ? newName.toLowerCase()
        : `${newName.toLowerCase()}.network`,
      ip: generateIP(),
      type: selectedIcon === "website" ? "website" : "device",
      icon: selectedIcon,
    };

    setRecords([...records, newRecord]);
    setNewName("");
  };

  const simulateDNSQuery = (query: string) => {
    setIsQuerying(true);
    setQueryResult(null);

    setTimeout(() => {
      const result = records.find(
        (r) =>
          r.name.toLowerCase() === query.toLowerCase() ||
          r.name.toLowerCase() === `${query.toLowerCase()}.network`
      );

      setQueryResult(result || null);
      setIsQuerying(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-3xl p-4 sm:p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Your Mini DNS Zone
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Create your own network names and see how DNS works!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-end">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input
            placeholder="e.g., gaming-pc"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Device Type</label>
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {Object.entries(deviceIcons).map(([key, Icon]) => (
              <Button
                key={key}
                variant={selectedIcon === key ? "default" : "outline"}
                size="icon"
                onClick={() => setSelectedIcon(key as keyof typeof deviceIcons)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleAddRecord}
          disabled={!newName}
          className="w-full sm:w-auto flex gap-2 items-center justify-center"
        >
          <Plus className="w-4 h-4" />
          <span>Add Device</span>
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm sm:text-base font-medium">Your DNS Records</h3>
        <div className="grid gap-2 sm:gap-3">
          {records.map((record) => {
            const Icon = deviceIcons[record.icon];
            return (
              <div
                key={record.id}
                className={cn(
                  "p-3 sm:p-4 rounded-lg border bg-card",
                  "flex items-center gap-3 sm:gap-4",
                  "group hover:border-primary/50 transition-colors"
                )}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">
                    {record.name}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {record.ip}
                  </p>
                </div>
                {record.id !== "home" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setRecords(records.filter((r) => r.id !== record.id))
                    }
                    className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-sm sm:text-base font-medium">Try Your DNS!</h3>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Input
            placeholder="Search for a device..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && simulateDNSQuery(searchQuery)
            }
            className="w-full"
          />
          <Button
            onClick={() => simulateDNSQuery(searchQuery)}
            disabled={isQuerying}
            className="w-full sm:w-auto flex gap-2 items-center justify-center"
          >
            {isQuerying ? (
              <div className="animate-spin">⚡</div>
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
            <span>Lookup</span>
          </Button>
        </div>

        {queryResult && (
          <div className="p-3 sm:p-4 rounded-lg bg-primary/5 flex items-center gap-3 sm:gap-4">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-sm sm:text-base">Found it! 🎉</p>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                {queryResult.name} → {queryResult.ip}
              </p>
            </div>
          </div>
        )}

        {queryResult === null && !isQuerying && searchQuery && (
          <div className="p-3 sm:p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              No DNS record found for "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

const styles = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

export default DNSPlayground;
