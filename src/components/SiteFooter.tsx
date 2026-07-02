export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-void/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Built for curious minds. © {new Date().getFullYear()} Cosmos Explorer.
          </p>
          <p className="text-xs text-muted-foreground">
            Educational content inspired by NASA, ESA and the astronomy community.
          </p>
        </div>
      </div>
    </footer>
  );
}
