"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MatchCard } from "@/components/MatchCard";
import { PredictionForm } from "@/components/PredictionForm";
import { Leaderboard } from "@/components/Leaderboard";
import { useMatch } from "@/hooks/useMatch";
import type { Prediction } from "@/types";

const PREDICTION_KEY = "bolao:prediction";

export default function PlayPage() {
  const router = useRouter();
  const { match } = useMatch();
  const [name, setName] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("bolao:name");
    if (!stored) {
      router.replace("/");
      return;
    }
    setName(stored);

    const raw = localStorage.getItem(PREDICTION_KEY);
    if (raw) {
      try {
        setPrediction(JSON.parse(raw) as Prediction);
      } catch {
        localStorage.removeItem(PREDICTION_KEY);
      }
    }
  }, [router]);

  function handleSaved(saved: Prediction) {
    localStorage.setItem(PREDICTION_KEY, JSON.stringify(saved));
    setPrediction(saved);
  }

  if (!name) return null;

  return (
    <div className="pitch-bg flex min-h-dvh flex-col">
      <Navbar />
      <main className="container flex-1 space-y-6 py-8 md:max-w-2xl">
        <MatchCard match={match} />
        <PredictionForm
          match={match}
          name={name}
          prediction={prediction}
          onSaved={handleSaved}
        />
        <Leaderboard highlightId={prediction?.id ?? null} />
      </main>
      <Footer />
    </div>
  );
}
