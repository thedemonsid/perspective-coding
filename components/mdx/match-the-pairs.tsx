"use client";
import React, { useState, useEffect } from "react";
import {
  Receipt,
  Building,
  Train,
  Store,
  Smartphone,
  Globe,
  Wifi,
  ShoppingCart,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const SERVICES = {
  traditional: [
    { id: "t1", text: "Queue", icon: <Receipt className="w-6 h-6" /> },
    { id: "t2", text: "Branch visit", icon: <Building className="w-6 h-6" /> },
    { id: "t3", text: "Counter", icon: <Train className="w-6 h-6" /> },
    { id: "t4", text: "Market", icon: <Store className="w-6 h-6" /> },
  ],
  digital: [
    {
      id: "d1",
      text: "Mobile app",
      icon: <Smartphone className="w-6 h-6" />,
      matches: "t1",
    },
    {
      id: "d2",
      text: "Net banking",
      icon: <Globe className="w-6 h-6" />,
      matches: "t2",
    },
    {
      id: "d3",
      text: "IRCTC",
      icon: <Wifi className="w-6 h-6" />,
      matches: "t3",
    },
    {
      id: "d4",
      text: "E-commerce",
      icon: <ShoppingCart className="w-6 h-6" />,
      matches: "t4",
    },
  ],
};

const ServiceMatchGame = () => {
  const [matches, setMatches] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const [shuffledTraditional, setShuffledTraditional] = useState<
    typeof SERVICES.traditional
  >([]);
  const [shuffledDigital, setShuffledDigital] = useState<
    typeof SERVICES.digital
  >([]);

  useEffect(() => {
    // Fisher-Yates shuffle algorithm
    const shuffle = <T,>(array: T[]): T[] => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    setShuffledTraditional(shuffle(SERVICES.traditional));
    setShuffledDigital(shuffle(SERVICES.digital));
  }, []);

  interface DigitalService {
    id: string;
    text: string;
    icon: React.ReactNode;
    matches: string;
  }

  const handleClick = (id: string, type: "digital" | "traditional"): void => {
    if (!selected) {
      setSelected(id);
      return;
    }

    const digitalService: DigitalService | undefined =
      type === "digital"
        ? SERVICES.digital.find((s) => s.id === id)
        : SERVICES.digital.find((s) => s.matches === id);

    if (!digitalService) return;

    const matchMade: boolean =
      type === "digital"
        ? selected === digitalService.matches
        : digitalService.id === selected;

    if (matchMade) {
      setMatches(new Set([...matches, id, selected]));
    }
    setSelected(null);
  };

  const isGameComplete = matches.size === SERVICES.traditional.length * 2;

  interface ItemClassesProps {
    itemId: string;
    isSelected: boolean;
  }

  const getItemClasses = ({ itemId, isSelected }: ItemClassesProps): string => `
      p-4 rounded-lg cursor-pointer
      flex items-center gap-3
      transition-all duration-200 hover:scale-105
      ${
        isSelected
          ? "bg-primary text-primary-foreground"
          : "bg-card hover:bg-accent"
      }
      ${matches.has(itemId) ? "opacity-50 pointer-events-none" : ""}
    `;

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-muted">
      <h3 className="text-2xl font-bold mb-6 text-center text-foreground">
        Match Traditional with Digital
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-semibold text-center mb-4 text-foreground/90">
            Traditional Methods
          </h4>
          {shuffledTraditional.map((service) => (
            <div
              key={service.id}
              className={getItemClasses({
                itemId: service.id,
                isSelected: selected === service.id,
              })}
              onClick={() => handleClick(service.id, "traditional")}
            >
              {service.icon}
              <span>{service.text}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-center mb-4 text-foreground/90">
            Digital Methods
          </h4>
          {shuffledDigital.map((service) => (
            <div
              key={service.id}
              className={getItemClasses({
                itemId: service.id,
                isSelected: selected === service.id,
              })}
              onClick={() => handleClick(service.id, "digital")}
            >
              {service.icon}
              <span>{service.text}</span>
            </div>
          ))}
        </div>
      </div>

      {isGameComplete && (
        <div className="mt-6 text-center text-primary font-bold">
          🎉 Great job! You&apos;ve matched all the services!
        </div>
      )}
    </Card>
  );
};

export default ServiceMatchGame;
