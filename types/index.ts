export type MatchStatus = "scheduled" | "live" | "finished";

export interface Match {
  teamHome: string;
  teamAway: string;
  startTime: string;
  resultHome: number | null;
  resultAway: number | null;
  status: MatchStatus;
}

export interface Prediction {
  id: string;
  name: string;
  scoreBrazil: number;
  scoreOpponent: number;
  createdAt: number;
  points: number;
}

export interface RankedPrediction extends Prediction {
  position: number;
}
