"use client";

import { useEffect, useState } from "react";
import { subscribeMatch } from "@/services/match";
import { DEFAULT_MATCH } from "@/lib/config";
import type { Match } from "@/types";

export function useMatch() {
  const [match, setMatch] = useState<Match>(DEFAULT_MATCH);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeMatch((data) => {
      setMatch(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { match, loading };
}
