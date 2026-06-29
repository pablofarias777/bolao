"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  function handleEnter() {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      toast.error("Digite seu nome para entrar.");
      return;
    }
    localStorage.setItem("bolao:name", trimmed);
    router.push("/play");
  }

  return (
    <main className="pitch-bg flex min-h-dvh flex-col items-center justify-center p-6">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card>
          <CardContent className="flex flex-col items-center gap-6 py-12">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-6xl"
            >
              🇧🇷
            </motion.span>

            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                BOLÃO DO BRASIL
              </h1>
              <p className="text-muted-foreground">
                Faça seu palpite para o jogo de hoje.
              </p>
            </div>

            <div className="w-full space-y-3">
              <Input
                autoFocus
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                className="text-center text-lg"
              />
              <Button
                variant="success"
                size="lg"
                className="w-full"
                onClick={handleEnter}
              >
                Entrar <ArrowRight />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
