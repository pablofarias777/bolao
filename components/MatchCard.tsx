"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Countdown } from "@/components/Countdown";
import type { Match } from "@/types";

function formatKickoff(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function MatchCard({ match }: { match: Match }) {
  const finished = match.status === "finished";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-brand-green via-brand-green to-brand-blue p-8 text-white">
          <div className="flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-widest text-white/80">
            <Trophy className="size-4" />
            Jogo de hoje
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 md:gap-8">
            <Team name={match.teamHome} flag="🇧🇷" />
            <div className="flex flex-col items-center">
              {finished ? (
                <span className="text-4xl font-black tabular-nums md:text-5xl">
                  {match.resultHome} <span className="text-white/50">x</span>{" "}
                  {match.resultAway}
                </span>
              ) : (
                <span className="text-3xl font-black text-brand-yellow md:text-4xl">
                  ×
                </span>
              )}
            </div>
            <Team name={match.teamAway} flag="🌎" />
          </div>

          <p className="mt-6 text-center text-sm capitalize text-white/80">
            {formatKickoff(match.startTime)}
          </p>
        </div>

        <div className="flex justify-center p-6">
          {finished ? (
            <span className="rounded-full bg-brand-green/15 px-4 py-1.5 text-sm font-semibold text-brand-green">
              Resultado final
            </span>
          ) : (
            <Countdown targetIso={match.startTime} />
          )}
        </div>
      </Card>
    </motion.div>
  );
}

function Team({ name, flag }: { name: string; flag: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <span className="text-4xl md:text-5xl">{flag}</span>
      <span className="text-center text-lg font-bold leading-tight md:text-xl">
        {name}
      </span>
    </div>
  );
}
