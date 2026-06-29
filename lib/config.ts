import type { Match } from "@/types";

export const MATCH_DOC_ID = "current";

export const DEFAULT_MATCH: Match = {
  teamHome: "Brasil",
  teamAway: "Adversário",
  startTime: new Date(new Date().setHours(21, 0, 0, 0)).toISOString(),
  resultHome: null,
  resultAway: null,
  status: "scheduled",
};

export const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";
