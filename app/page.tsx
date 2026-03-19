"use client";

import { useState } from "react";

export default function Home() {
  const [decision, setDecision] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ decision }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 gap-4">
      <h1 className="text-3xl font-semibold">Decision Clarity Tool</h1>

      <textarea
        className="w-full max-w-xl border rounded-xl p-4"
        rows={4}
        placeholder="What decision are you trying to make?"
        value={decision}
        onChange={(e) => setDecision(e.target.value)}
      />

      <button
        onClick={analyze}
        className="px-6 py-3 border rounded-xl"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="max-w-xl border rounded-xl p-4 whitespace-pre-wrap">
          {result}
        </div>
      )}
    </main>
  );
}
