"use client";
import React, { useState } from "react";

const DeviceCounter = () => {
  const [devices, setDevices] = useState(1);
  const deviceTypes = {
    phones: 2, // phones per person
    laptops: 1, // laptop per person
    tablets: 1, // tablet per person
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setDevices(value);
  };

  return (
    <div className="p-6 bg-background shadow rounded-lg mb-8">
      <h3 className="text-xl font-bold mb-6">Family Device Calculator 📱</h3>
      <p className="mb-6 text-muted-foreground">
        See how many Internet-connected devices a family might have based on the
        number of family members.
      </p>
      <label className="block mb-3 text-sm font-medium">
        Number of family members:
      </label>
      <input
        type="number"
        value={devices}
        min={1}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-6 focus:ring-2 focus:ring-primary/50"
      />
      <div className="space-y-3 text-lg">
        <p>
          📱 Smartphones:{" "}
          <span className="font-bold">{devices * deviceTypes.phones}</span>
        </p>
        <p>
          💻 Laptops:{" "}
          <span className="font-bold">{devices * deviceTypes.laptops}</span>
        </p>
        <p>
          📱 Tablets:{" "}
          <span className="font-bold">{devices * deviceTypes.tablets}</span>
        </p>
        <p className="font-bold mt-6">
          Total devices:{" "}
          {devices *
            (deviceTypes.phones + deviceTypes.laptops + deviceTypes.tablets)}
        </p>
      </div>
    </div>
  );
};

const DataPacketSimulator = () => {
  const [messageSize, setMessageSize] = useState(100);
  const packetSize = 20; // bytes per packet

  const calculatePackets = () => {
    return Math.ceil(messageSize / packetSize);
  };

  return (
    <div className="p-6 bg-background shadow rounded-lg mb-8">
      <h3 className="text-xl font-bold mb-6">Data Packet Calculator 📦</h3>
      <p className="mb-6 text-muted-foreground">
        See how many packets are needed to send your message across the
        Internet. (Each packet can carry {packetSize} bytes)
      </p>
      <label className="block mb-3 text-sm font-medium">
        Message size (in bytes):
      </label>
      <input
        type="range"
        min="20"
        max="200"
        value={messageSize}
        onChange={(e) => setMessageSize(parseInt(e.target.value))}
        className="w-full mb-4"
      />
      <p className="text-lg mb-6">Size: {messageSize} bytes</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {[...Array(calculatePackets())].map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center"
            title={`Packet ${i + 1}`}
          >
            📦
          </div>
        ))}
      </div>
      <p className="text-lg">
        Your {messageSize} byte message needs{" "}
        <span className="font-bold">{calculatePackets()}</span> packets
      </p>
    </div>
  );
};

const NetworkLatencySimulator = () => {
  const [distance, setDistance] = useState(1000);
  const speedOfLight = 299792; // km/s
  const fiberOpticFactor = 0.67; // Speed in fiber is about 67% of speed of light

  const calculateLatency = () => {
    return ((distance / (speedOfLight * fiberOpticFactor)) * 1000).toFixed(2);
  };

  return (
    <div className="p-6 bg-background shadow rounded-lg mb-8">
      <h3 className="text-xl font-bold mb-6">Network Latency Explorer 🌐</h3>
      <p className="mb-6 text-muted-foreground">
        See how long it takes for data to travel through fiber optic cables
        across different distances.
      </p>
      <label className="block mb-3 text-sm font-medium">Distance (km):</label>
      <select
        value={distance}
        onChange={(e) => setDistance(parseInt(e.target.value))}
        className="border p-2 rounded w-full mb-6 focus:ring-2 focus:ring-primary/50"
      >
        <option value="100">Local City (100 km)</option>
        <option value="1000">Neighboring Country (1,000 km)</option>
        <option value="5000">Cross-Continental (5,000 km)</option>
        <option value="20000">Around the World (20,000 km)</option>
      </select>
      <p className="text-lg mb-3">
        Time taken:{" "}
        <span className="font-bold">{calculateLatency()} milliseconds</span>
      </p>
      <p className="text-sm text-muted-foreground">
        This is the theoretical minimum time. Real-world latency is usually
        higher due to routing and processing delays.
      </p>
    </div>
  );
};

export { DeviceCounter, DataPacketSimulator, NetworkLatencySimulator };
