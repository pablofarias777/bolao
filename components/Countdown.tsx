"use client";

import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background/70 text-3xl font-bold tabular-nums shadow-inner md:h-20 md:w-20 md:text-4xl">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ targetIso }: { targetIso: string }) {
  const time = useCountdown(targetIso);

  if (!time) return null;

  if (time.isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-brand-yellow/15 px-6 py-3 text-center text-lg font-bold text-brand-yellow"
      >
        ⚽ A bola já rolou!
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 md:gap-4">
      {time.days > 0 && <Unit value={time.days} label="dias" />}
      <Unit value={time.hours} label="horas" />
      <Unit value={time.minutes} label="min" />
      <Unit value={time.seconds} label="seg" />
    </div>
  );
}
