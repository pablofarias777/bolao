"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Lock, Pencil, Send, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addPrediction, updatePrediction } from "@/services/predictions";
import type { Match, Prediction } from "@/types";

const CLOSE_BEFORE_MS = 30 * 60 * 1000;

interface Props {
  match: Match;
  name: string;
  prediction: Prediction | null;
  onSaved: (prediction: Prediction) => void;
}

function fireConfetti() {
  const colors = ["#009C3B", "#FFDF00", "#002776", "#ffffff"];
  confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors });
  setTimeout(
    () =>
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors,
      }),
    150
  );
  setTimeout(
    () =>
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors,
      }),
    300
  );
}

export function PredictionForm({ match, name, prediction, onSaved }: Props) {
  const [home, setHome] = useState(
    prediction ? String(prediction.scoreBrazil) : ""
  );
  const [away, setAway] = useState(
    prediction ? String(prediction.scoreOpponent) : ""
  );
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);

  const deadline = new Date(match.startTime).getTime() - CLOSE_BEFORE_MS;
  const closed = match.status !== "scheduled" || Date.now() >= deadline;

  if (closed && !prediction) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <Lock className="size-10 text-muted-foreground" />
          <p className="text-lg font-semibold">Palpites encerrados</p>
          <p className="text-sm text-muted-foreground">
            O prazo terminou. Acompanhe o ranking abaixo.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (prediction && !editing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <CheckCircle2 className="size-12 text-brand-green" />
            <p className="text-lg font-semibold">
              Seu palpite foi registrado com sucesso.
            </p>
            <p className="text-3xl font-black tabular-nums">
              {prediction.scoreBrazil}{" "}
              <span className="text-muted-foreground">x</span>{" "}
              {prediction.scoreOpponent}
            </p>
            {closed ? (
              <p className="text-sm text-muted-foreground">
                Palpites encerrados — não é mais possível alterar. Boa sorte,{" "}
                {name}!
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Você pode alterar até 30 min antes do jogo.
                </p>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => setEditing(true)}
                >
                  <Pencil /> Alterar palpite
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  async function handleSubmit() {
    if (home === "" && away === "") {
      toast.error("Preencha o placar.");
      return;
    }
    const scoreBrazil = home === "" ? 0 : Number(home);
    const scoreOpponent = away === "" ? 0 : Number(away);
    setSubmitting(true);
    try {
      if (prediction) {
        await updatePrediction(prediction.id, { scoreBrazil, scoreOpponent });
        toast.success("Palpite atualizado!");
        onSaved({ ...prediction, scoreBrazil, scoreOpponent });
        setEditing(false);
      } else {
        const id = await addPrediction({ name, scoreBrazil, scoreOpponent });
        fireConfetti();
        toast.success("Palpite enviado!", {
          description: "Seu palpite foi registrado com sucesso.",
        });
        onSaved({
          id,
          name,
          scoreBrazil,
          scoreOpponent,
          createdAt: Date.now(),
          points: 0,
        });
      }
    } catch {
      toast.error("Não foi possível salvar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          {prediction ? "Alterar palpite" : "Faça seu palpite"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex items-end justify-center gap-4">
          <ScoreInput label={match.teamHome} value={home} onChange={setHome} />
          <span className="pb-4 text-2xl font-black text-muted-foreground">
            x
          </span>
          <ScoreInput label={match.teamAway} value={away} onChange={setAway} />
        </div>

        <div className="space-y-2">
          <Button
            variant="success"
            size="lg"
            className="w-full"
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" /> Salvando...
              </>
            ) : (
              <>
                <Send /> {prediction ? "Salvar alteração" : "Enviar Palpite"}
              </>
            )}
          </Button>

          {prediction && (
            <Button
              variant="ghost"
              className="w-full"
              disabled={submitting}
              onClick={() => {
                setHome(String(prediction.scoreBrazil));
                setAway(String(prediction.scoreOpponent));
                setEditing(false);
              }}
            >
              <X /> Cancelar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ScoreInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="max-w-[7rem] truncate text-sm font-semibold">
        {label}
      </span>
      <input
        type="number"
        min={0}
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
        placeholder="0"
        className="h-24 w-24 rounded-3xl border border-border bg-background/60 text-center text-5xl font-black shadow-inner outline-none transition-all focus:border-brand-green focus:ring-4 focus:ring-brand-green/20 md:h-28 md:w-28"
      />
    </div>
  );
}
