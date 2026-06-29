"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MatchCard } from "@/components/MatchCard";
import { PredictionForm } from "@/components/PredictionForm";
import { Leaderboard } from "@/components/Leaderboard";
import { useMatch } from "@/hooks/useMatch";

const PREDICTION_KEY = "bolao:predictionId";

export default function PlayPage() {
  const router = useRouter();
  const { match } = useMatch();
  const [name, setName] = useState<string | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("bolao:name");
    if (!stored) {
      router.replace("/");
      return;
    }
    setName(stored);
    setPredictionId(localStorage.getItem(PREDICTION_KEY));
  }, [router]);

  function handlePredicted(id: string) {
    localStorage.setItem(PREDICTION_KEY, id);
    setPredictionId(id);
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
          hasPredicted={!!predictionId}
          onPredicted={handlePredicted}
        />
        <Leaderboard highlightId={predictionId} />
      </main>
      <Footer />
    </div>
  );
}
