"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdminPanel } from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ADMIN_PASSWORD } from "@/lib/config";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!ADMIN_PASSWORD) {
      toast.error("Defina NEXT_PUBLIC_ADMIN_PASSWORD no ambiente.");
      return;
    }
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      toast.error("Senha incorreta.");
    }
  }

  return (
    <div className="pitch-bg flex min-h-dvh flex-col">
      <Navbar />
      <main className="container flex-1 py-8 md:max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-6 text-2xl font-black">Painel do Admin</h1>

          {authed ? (
            <AdminPanel />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="size-5" /> Acesso restrito
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <Button className="w-full" onClick={handleLogin}>
                  Entrar
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
