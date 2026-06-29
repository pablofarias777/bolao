"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMatch } from "@/hooks/useMatch";
import { saveMatch, updateResult } from "@/services/match";

export function AdminPanel() {
  const { match, loading } = useMatch();

  const [teamAway, setTeamAway] = useState("");
  const [startTime, setStartTime] = useState("");
  const [resultHome, setResultHome] = useState("");
  const [resultAway, setResultAway] = useState("");
  const [savingMatch, setSavingMatch] = useState(false);
  const [savingResult, setSavingResult] = useState(false);

  useEffect(() => {
    if (loading) return;
    setTeamAway(match.teamAway);
    setStartTime(toLocalInput(match.startTime));
    setResultHome(match.resultHome?.toString() ?? "");
    setResultAway(match.resultAway?.toString() ?? "");
  }, [loading, match]);

  async function handleSaveMatch() {
    setSavingMatch(true);
    try {
      await saveMatch({
        teamHome: "Brasil",
        teamAway: teamAway.trim() || "Adversário",
        startTime: new Date(startTime).toISOString(),
        status: "scheduled",
      });
      toast.success("Partida atualizada.");
    } catch {
      toast.error("Erro ao salvar a partida.");
    } finally {
      setSavingMatch(false);
    }
  }

  async function handleSaveResult() {
    if (resultHome === "" || resultAway === "") {
      toast.error("Informe o placar final.");
      return;
    }
    setSavingResult(true);
    try {
      await updateResult(Number(resultHome), Number(resultAway));
      toast.success("Resultado salvo e ranking recalculado!");
    } catch {
      toast.error("Erro ao salvar o resultado.");
    } finally {
      setSavingResult(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurar partida</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Adversário</Label>
            <Input
              value={teamAway}
              onChange={(e) => setTeamAway(e.target.value)}
              placeholder="Argentina"
            />
          </div>
          <div className="space-y-2">
            <Label>Horário do jogo</Label>
            <Input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <Button onClick={handleSaveMatch} disabled={savingMatch}>
            {savingMatch ? <Loader2 className="animate-spin" /> : <Save />}
            Salvar partida
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resultado final</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label>Brasil</Label>
              <Input
                type="number"
                min={0}
                value={resultHome}
                onChange={(e) => setResultHome(e.target.value)}
              />
            </div>
            <span className="pb-3 font-bold">x</span>
            <div className="flex-1 space-y-2">
              <Label>{teamAway || "Visitante"}</Label>
              <Input
                type="number"
                min={0}
                value={resultAway}
                onChange={(e) => setResultAway(e.target.value)}
              />
            </div>
          </div>
          <Button
            variant="success"
            onClick={handleSaveResult}
            disabled={savingResult}
            className="w-full"
          >
            {savingResult ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ShieldCheck />
            )}
            Salvar e atualizar ranking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function toLocalInput(iso: string) {
  const d = new Date(iso);
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 16);
}
