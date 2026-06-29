# 🇧🇷 Bolão do Brasil

MVP de bolão para o jogo do Brasil. O usuário entra com o nome, faz seu palpite,
e acompanha o ranking **em tempo real**. Você (admin) informa o placar final e a
pontuação é recalculada automaticamente.

- **Acertou o placar exato → 3 pontos**
- **Acertou apenas o vencedor (ou empate) → 1 ponto**
- **Errou → 0 pontos**

## Stack

- Next.js 15 (App Router) + TypeScript
- TailwindCSS + shadcn/ui + Lucide
- Framer Motion (animações) + canvas-confetti
- Firebase Firestore (tempo real, sem backend próprio)
- Deploy na Vercel

## Estrutura

```
app/            páginas: / (entrar), /play (palpite + ranking), /admin
components/     MatchCard, PredictionForm, Leaderboard, Countdown, Navbar, Footer, AdminPanel, ui/
hooks/          useMatch, usePredictions, useCountdown
lib/            firebase, scoring, config, utils
services/       match (updateResult), predictions
types/          modelos Match e Prediction
```

## 1. Rodar localmente

```bash
npm install
cp .env.local.example .env.local   # preencha as variáveis (veja abaixo)
npm run dev
```

Abra http://localhost:3000

## 2. Configurar o Firebase (≈ 5 min)

1. Acesse https://console.firebase.google.com e clique em **Adicionar projeto**.
2. No projeto, vá em **Build → Firestore Database → Criar banco de dados**.
   Escolha **Iniciar no modo de teste** (ou cole o conteúdo de `firestore.rules`).
3. Vá em **Configurações do projeto (⚙️) → Seus apps → Web (</>)** e registre um app.
4. Copie os valores do objeto `firebaseConfig` para o seu `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_ADMIN_PASSWORD=escolha-uma-senha
```

As coleções `predictions` e `match` são criadas automaticamente no primeiro uso.
Não precisa criar nada manualmente.

## 3. Definir a partida

Acesse `/admin`, digite a senha (`NEXT_PUBLIC_ADMIN_PASSWORD`) e:

- **Configurar partida**: nome do adversário + horário do jogo (libera o countdown).
- **Resultado final**: ao salvar o placar, `updateResult()` recalcula a pontuação
  de **todos** os palpites e o ranking se atualiza sozinho na tela de todos.

> Antes de configurar, o app usa uma partida padrão (Brasil x Adversário, hoje 21h).

## 4. Publicar na Vercel

1. Suba o projeto para o GitHub.
2. Em https://vercel.com → **Add New → Project** → importe o repositório.
3. Em **Environment Variables**, adicione as mesmas chaves do `.env.local`.
4. **Deploy**. Pronto — compartilhe o link com a galera. 🎉

## Observações de segurança (MVP)

Este é um bolão descontraído entre amigos: as regras do Firestore são abertas e a
senha do admin é uma variável `NEXT_PUBLIC_*` (visível no cliente). É o suficiente
para o caso de uso. Para algo público/sério, mova a escrita para uma rota de
servidor com o Firebase Admin SDK e restrinja as regras do Firestore.
