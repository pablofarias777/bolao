"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePredictions } from "@/hooks/usePredictions";
import { cn } from "@/lib/utils";

const MEDALS = ["🥇", "🥈", "🥉"];

export function Leaderboard({ highlightId }: { highlightId?: string | null }) {
  const { predictions, loading } = usePredictions();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="size-5 text-brand-green" />
          Ranking
          <span className="ml-auto rounded-full bg-muted px-2.5 py-0.5 text-sm font-medium text-muted-foreground">
            {predictions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 md:px-4">
        {loading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-xl bg-muted/60"
              />
            ))}
          </div>
        ) : predictions.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Ninguém palpitou ainda. Seja o primeiro!
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="text-center">Palpite</TableHead>
                <TableHead className="text-right">Pontos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {predictions.map((p, index) => (
                  <motion.tr
                    key={p.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "border-b border-border/50 transition-colors hover:bg-muted/40",
                      p.id === highlightId && "bg-brand-green/10"
                    )}
                  >
                    <TableCell className="font-bold tabular-nums">
                      {MEDALS[index] ?? index + 1}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {p.name}
                      {p.id === highlightId && (
                        <span className="ml-2 text-xs text-brand-green">
                          (você)
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center tabular-nums text-muted-foreground">
                      {p.scoreBrazil}x{p.scoreOpponent}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold tabular-nums text-brand-green">
                        {p.points} pts
                      </span>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
