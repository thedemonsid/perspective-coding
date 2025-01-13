"use client";
import React, { useState } from "react";

const lemonEmoji = "🍋";
const waterEmoji = "🥤";
const sugarEmoji = "🍚";

const LemonadeCalculator = () => {
  const [glasses, setGlasses] = useState(1);
  const [lemons, setLemons] = useState(2);
  const [sugar, setSugar] = useState(3);
  const [water, setWater] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setGlasses(0);
      setLemons(0);
      setSugar(0);
      setWater(0);
      return;
    }
    const value = parseInt(e.target.value, 10);
    setGlasses(value);
    setLemons(value * 2);
    setSugar(value * 3);
    setWater(value);
  };

  return (
    <div className="p-4 bg-background shadow rounded-lg">
      <h3 className="text-xl font-bold mb-4">
        Interactive Lemonade Calculator
      </h3>
      <p className="mb-4">
        Enter the number of glasses of lemonade you want to make, and see how
        many lemons, spoons of sugar, and glasses of water you need.
      </p>
      <label className="block mb-2">Number of Glasses:</label>
      <input
        type="number"
        value={glasses}
        min={1}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
      />
      <button
        onClick={() => {
          setGlasses(glasses + 1);
          setLemons((glasses + 1) * 2);
          setSugar((glasses + 1) * 3);
          setWater(glasses + 1);
        }}
        className="bg-primary text-white px-4 py-2 rounded mb-4"
      >
        Add People
      </button>
      <p className="text-lg">
        You need <span className="font-bold">{lemons}</span> {lemonEmoji},{" "}
        <span className="font-bold">{sugar}</span> spoons of {sugarEmoji}, and{" "}
        <span className="font-bold">{water}</span> glasses of {waterEmoji} for{" "}
        <span className="font-bold">{glasses}</span> glasses of lemonade.
      </p>
      <p>
        <small className="text-gray-500">
          *(1 glass = 2 lemons, 3 spoons of sugar, and 1 glass of water)
        </small>
      </p>
    </div>
  );
};

const VariableExplorer = () => {
  const [variable, setVariable] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariable(parseInt(e.target.value, 10));
  };

  return (
    <div className="p-4 bg-background shadow rounded-lg">
      <h3 className="text-xl font-bold mb-4">Interactive Variable Explorer</h3>
      <p className="mb-4">
        Set the value of the variable (x) and see how it changes in different
        expressions.
      </p>
      <label className="block mb-2">Set Variable (x):</label>
      <input
        type="number"
        value={variable}
        min={0}
        max={2000}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
      />
      <p className="text-lg">
        If x = {variable}, then:
        <br />x + 2 = {variable + 2}
        <br />
        3x = {variable * 3}
        <br />
        x² = {variable * variable}
      </p>
    </div>
  );
};

const PatternRecognitionGame = () => {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [points, setPoints] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const checkPattern = () => {
    const value = parseInt(inputValue, 10);
    if (value % 10 === 0) {
      setMessage("Correct! The pattern is numbers ending in 0.");
      setPoints(points + 1);
    } else {
      setMessage("Try again! Look for a pattern in the numbers.");
    }
  };

  return (
    <div className="p-4 bg-background shadow rounded-lg">
      <h3 className="text-xl font-bold mb-4">
        Interactive Pattern Recognition Game
      </h3>
      <p className="mb-4">
        Enter a number and see if you can recognize the pattern. Hint: Look for
        numbers ending in 0.
      </p>
      <label className="block mb-2">Enter a number:</label>
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
      />
      <button
        onClick={checkPattern}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Check Pattern
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}
      <p className="mt-4 text-lg">Points: {points}</p>
    </div>
  );
};

const StoryCreatorTool = () => {
  const [story, setStory] = useState("In life the most important thing is x");
  const [variable, setVariable] = useState("Perspective");

  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStory(e.target.value);
  };

  const handleVariableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariable(e.target.value);
  };

  const highlightVariable = (text: string, variable: string) => {
    const parts = text.split(/(x)/g);
    return parts.map((part, index) =>
      part === "x" ? (
        <span key={index} className="bg-yellow-200 px-1 rounded">
          {variable}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="p-4 bg-background shadow rounded-lg">
      <h3 className="text-xl font-bold mb-4">Story Creator Tool</h3>
      <p className="mb-4">
        Enter a variable and write a story. The variable will be replaced with
        the value you set.
      </p>
      <label className="block mb-2">Enter a variable for</label>
      <div className="flex items-center gap-2 mb-4">
        <label className="bg-yellow-100 px-2 py-1 rounded text-gray-700 font-semibold">
          x
        </label>
        <label className="bg-yellow-100 px-2 py-1 rounded text-gray-700 font-semibold">
          =
        </label>
        <input
          type="text"
          value={variable}
          onChange={handleVariableChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <label className="block mb-2">Write your story:</label>
      <textarea
        value={story}
        onChange={handleStoryChange}
        className="border p-2 rounded mb-4 w-full"
        rows={4}
      />
      <p className="text-lg flex-col justify-between flex gap-2">
        <span>Your story with variable:</span>{" "}
        <span className="bg-background text-muted-foreground px-1 rounded-sm">
          {highlightVariable(story, variable)}
        </span>
      </p>
    </div>
  );
};

export {
  VariableExplorer,
  LemonadeCalculator,
  PatternRecognitionGame,
  StoryCreatorTool,
};
