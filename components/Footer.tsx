export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container flex flex-col items-center gap-1 text-center text-sm text-muted-foreground">
        <p>Feito com 💚💛 para a torcida brasileira.</p>
        <p className="text-xs">Bolão do Brasil · {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
