"use client";

import { useState } from "react";

export default function Home() {
  const [decision, setDecision] = useState("");
  const [options, setOptions] = useState("");
  const [priorities, setPriorities] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    setResult("");

    try {
      const fullInput = `
Decision: ${decision}
Options: ${options}
Priorities: ${priorities}
`;

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ decision: fullInput }),
      });

      const data = await res.json();
      setResult(data.result || "No response generated.");
    } catch (err) {
      setResult("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 gap-4">
      <h1 className="text-3xl font-semibold">NextMove</h1>
      <p className="text-sm opacity-70 mb-2 text-center max-w-md">
        Make better decisions with structured guidance.
      </p>

      <input
        className="w-full max-w-xl border rounded-xl p-3"
        placeholder="What decision are you trying to make?"
        value={decision}
        onChange={(e) => setDecision(e.target.value)}
      />

      <input
        className="w-full max-w-xl border rounded-xl p-3"
        placeholder="Options (separate with commas, eg. pizza, brownie)"
        value={options}
        onChange={(e) => setOptions(e.target.value)}
      />

      <input
        className="w-full max-w-xl border rounded-xl p-3"
        placeholder="What matters most? (cost, time, risk, etc.)"
        value={priorities}
        onChange={(e) => setPriorities(e.target.value)}
      />

      <button
        onClick={analyze}
        className="px-6 py-3 border rounded-xl font-medium"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Get Recommendation"}
      </button>

      {result && (
        <div className="max-w-xl border rounded-xl p-4 whitespace-pre-wrap">
          {result}
        </div>
      )}
    </main>
  );
}
