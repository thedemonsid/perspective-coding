"use client";
import React, { useState } from "react";

const MessageSpeedComparator = () => {
  const [distance, setDistance] = useState(1000);
  const communicationMethods = {
    letter: { speed: 50, emoji: "✉️" }, // km per day
    telegraph: { speed: 299792, emoji: "⚡" }, // km per second
    email: { speed: 299792, emoji: "📧" }, // km per second
  };

  const calculateTime = (speed: number) => {
    const timeInSeconds = distance / speed;
    if (speed === communicationMethods.letter.speed) {
      return `${Math.ceil(timeInSeconds / (24 * 60 * 60))} days`;
    }
    return `${timeInSeconds.toFixed(3)} seconds`;
  };

  return (
    <div className="p-6 bg-background shadow rounded-lg mb-8">
      <h3 className="text-xl font-bold mb-6">Message Speed Calculator</h3>
      <p className="mb-6 text-muted-foreground">
        Compare how long a message would take to reach its destination using
        different methods.
      </p>
      <label className="block mb-3 text-sm font-medium">Distance (km):</label>
      <select
        value={distance}
        onChange={(e) => setDistance(parseInt(e.target.value))}
        className="border p-2 rounded w-full mb-6 focus:ring-2 focus:ring-primary/50"
      >
        <option value="100">Same City (100 km)</option>
        <option value="1000">Different State (1,000 km)</option>
        <option value="5000">Different Country (5,000 km)</option>
        <option value="15000">Different Continent (15,000 km)</option>
      </select>
      <div className="space-y-3 text-lg">
        <p>
          {communicationMethods.letter.emoji} Letter:{" "}
          <span className="font-bold">
            {calculateTime(communicationMethods.letter.speed)}
          </span>
        </p>
        <p>
          {communicationMethods.telegraph.emoji} Telegraph:{" "}
          <span className="font-bold">
            {calculateTime(communicationMethods.telegraph.speed)}
          </span>
        </p>
        <p>
          {communicationMethods.email.emoji} Email:{" "}
          <span className="font-bold">
            {calculateTime(communicationMethods.email.speed)}
          </span>
        </p>
      </div>
    </div>
  );
};

const MessageTranslator = () => {
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState("text");

  const translateMessage = (text: string, method: string) => {
    switch (method) {
      case "morse":
        // Simple morse code conversion (just for demonstration)
        return text
          .toUpperCase()
          .split("")
          .map((char) => {
            const morse: { [key: string]: string } = {
              A: ".-",
              B: "-...",
              C: "-.-.",
              D: "-..",
              E: ".",
              F: "..-.",
              G: "--.",
              H: "....",
              I: "..",
              J: ".---",
              K: "-.-",
              L: ".-..",
              M: "--",
              N: "-.",
              O: "---",
              P: ".--.",
              Q: "--.-",
              R: ".-.",
              S: "...",
              T: "-",
              U: "..-",
              V: "...-",
              W: ".--",
              X: "-..-",
              Y: "-.--",
              Z: "--..",
              " ": "/",
            };
            return morse[char] || char;
          })
          .join(" ");
      case "pigeon":
        return `🕊️ ${text} 🕊️`;
      default:
        return text;
    }
  };

  return (
    <div className="p-6 bg-background shadow rounded-lg mb-8">
      <h3 className="text-xl font-bold mb-6">Historical Message Translator</h3>
      <p className="mb-6 text-muted-foreground">
        See how your message would look using different communication methods.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block mb-3 text-sm font-medium">
            Your Message:
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-primary/50"
            placeholder="Type your message here"
          />
        </div>
        <div>
          <label className="block mb-3 text-sm font-medium">
            Communication Method:
          </label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-primary/50"
          >
            <option value="text">Modern Text</option>
            <option value="morse">Telegraph (Morse)</option>
            <option value="pigeon">Carrier Pigeon</option>
          </select>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-mono text-lg">
            {translateMessage(message, method)}
          </p>
        </div>
      </div>
    </div>
  );
};

const CommunicationCostCalculator = () => {
  const [wordCount, setWordCount] = useState(100);
  const [year, setYear] = useState(1850);

  const calculateCost = (words: number, year: number) => {
    // Simplified historical cost estimation
    const baseCosts = {
      1850: 0.05, // per word for telegraph
      1900: 0.02, // early telephone
      1950: 0.01, // modern telephone
      2000: 0.001, // early internet
      2024: 0.0001, // modern internet
    };

    const nearestYear = Object.keys(baseCosts)
      .map(Number)
      .reduce((a, b) => {
        return Math.abs(b - year) < Math.abs(a - year) ? b : a;
      });

    return (words * baseCosts[nearestYear as keyof typeof baseCosts]).toFixed(
      2
    );
  };

  return (
    <div className="p-6 bg-background shadow rounded-lg mb-8">
      <h3 className="text-xl font-bold mb-6">
        Historical Communication Cost Calculator
      </h3>
      <p className="mb-6 text-muted-foreground">
        Compare how much it would cost to send messages in different eras.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block mb-3 text-sm font-medium">
            Number of words:
          </label>
          <input
            type="number"
            value={wordCount}
            onChange={(e) => setWordCount(parseInt(e.target.value) || 0)}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-primary/50"
            min="1"
          />
        </div>
        <div>
          <label className="block mb-3 text-sm font-medium">Year:</label>
          <input
            type="range"
            min="1850"
            max="2024"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="w-full mb-2"
          />
          <p className="text-center text-lg">{year}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-lg font-bold">
            Estimated cost: ${calculateCost(wordCount, year)}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            (Adjusted for historical prices)
          </p>
        </div>
      </div>
    </div>
  );
};

export {
  MessageSpeedComparator,
  MessageTranslator,
  CommunicationCostCalculator,
};
