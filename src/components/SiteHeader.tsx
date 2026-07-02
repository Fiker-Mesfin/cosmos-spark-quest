import { Link } from "@tanstack/react-router";
import { Rocket } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/solar-system", label: "Solar System" },
  { to: "/explore", label: "Explore" },
];

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-void/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-cosmic-gradient ring-glow">
            <Rocket className="h-4.5 w-4.5 text-void" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Cosmos<span className="text-accent">Explorer</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to as never}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
