"use client";

import { useEffect, useState } from "react";
import { subscribePredictions } from "@/services/predictions";
import type { Prediction } from "@/types";

export function usePredictions() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribePredictions((data) => {
      setPredictions(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { predictions, loading };
}
