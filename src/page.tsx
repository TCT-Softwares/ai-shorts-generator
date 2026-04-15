"use client";

import { useState } from "react";

export default function Home() {
  const [game, setGame] = useState("League of Legends");
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic) return;

    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ game, topic }),
    });

    const data = await res.json();
    setResult(data.content);
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">
        AI Shorts Generator 🎮
      </h1>

      <div className="w-full max-w-xl space-y-4">
        <select
          value={game}
          onChange={(e) => setGame(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded"
        >
          <option>League of Legends</option>
          <option>Valorant</option>
          <option>Genshin Impact</option>
        </select>

        <input
          type="text"
          placeholder="Enter topic (e.g. Annie one shot build)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded"
        />

        <button
          onClick={generate}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        {result && (
          <div className="bg-gray-900 p-4 rounded mt-4 whitespace-pre-wrap">
            {result}

            <button
              onClick={copy}
              className="mt-4 bg-green-600 px-4 py-2 rounded"
            >
              Copy
            </button>
            <p className="text-sm text-gray-400">
              Free 5 generations/day. Upgrade soon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
