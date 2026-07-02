import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, Gauge } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SolarSystem3D } from "@/components/SolarSystem3D";
import { PLANETS, type Planet } from "@/lib/space-data";

export const Route = createFileRoute("/solar-system")({
  head: () => ({
    meta: [
      { title: "3D Solar System — Cosmos Explorer" },
      { name: "description", content: "Interactive 3D model of our solar system. Rotate the view, click any planet, and see real orbital data, day length, and moons." },
      { property: "og:title", content: "3D Solar System — Cosmos Explorer" },
      { property: "og:description", content: "Fly around the Sun and click any planet to learn about it." },
    ],
  }),
  component: SolarSystemPage,
});

function SolarSystemPage() {
  const [selected, setSelected] = useState<Planet | null>(null);
  const [speed, setSpeed] = useState(1);

  return (
    <div className="relative min-h-screen bg-void text-foreground">
      <SiteHeader />

      {/* 3D Canvas fills viewport under header */}
      <div className="fixed inset-0 top-16 bg-starfield">
        <SolarSystem3D
          onSelect={(p) => setSelected(p)}
          selectedSlug={selected?.slug ?? null}
          speedMul={speed}
        />
      </div>

      {/* Overlay UI */}
      <div className="pointer-events-none relative z-10 pt-16">
        {/* Top-left title */}
        <div className="absolute left-4 top-4 max-w-sm sm:left-6 sm:top-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-auto rounded-2xl border border-white/10 bg-void/70 p-5 backdrop-blur-xl"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
              Live · Interactive
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl">The Solar System</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Drag to orbit · scroll to zoom · click a planet.
            </p>
          </motion.div>
        </div>

        {/* Speed control (bottom-left) */}
        <div className="pointer-events-auto absolute bottom-6 left-4 rounded-2xl border border-white/10 bg-void/70 p-4 backdrop-blur-xl sm:left-6">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Gauge className="h-3.5 w-3.5" /> Orbital speed
          </div>
          <input
            type="range"
            min={0}
            max={5}
            step={0.1}
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-48 accent-[color:var(--accent)]"
          />
          <div className="mt-1 text-right text-xs text-muted-foreground">{speed.toFixed(1)}×</div>
        </div>

        {/* Planet list (top-right on desktop) */}
        <div className="pointer-events-auto absolute right-4 top-4 hidden max-h-[70vh] w-64 overflow-y-auto rounded-2xl border border-white/10 bg-void/70 p-4 backdrop-blur-xl sm:right-6 sm:top-6 md:block">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Info className="h-3.5 w-3.5" /> Planets
          </div>
          <div className="space-y-1">
            {PLANETS.map((p) => (
              <button
                key={p.slug}
                onClick={() => setSelected(p)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selected?.slug === p.slug ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <span
                  className="h-4 w-4 shrink-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${p.color}, #000 90%)`,
                    boxShadow: `0 0 12px ${p.color}80`,
                  }}
                />
                <span className="flex-1 truncate">{p.name}</span>
                <span className="text-xs text-muted-foreground">{p.distanceAu} AU</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 22 }}
              className="pointer-events-auto absolute bottom-6 right-4 max-w-md rounded-2xl border border-white/10 bg-void/80 p-6 backdrop-blur-xl sm:right-6"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-4">
                <div
                  className="h-16 w-16 shrink-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${selected.color}, #000 90%)`,
                    boxShadow: `0 0 40px -4px ${selected.color}90`,
                  }}
                />
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Planet</div>
                  <h2 className="font-display text-2xl font-bold">{selected.name}</h2>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{selected.tagline}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { k: "Distance", v: `${selected.distanceAu} AU` },
                  { k: "Diameter", v: `${selected.diameterKm.toLocaleString()} km` },
                  { k: "Year", v: `${selected.yearDays.toLocaleString()} d` },
                  { k: "Moons", v: selected.moons },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.k}</div>
                    <div className="mt-0.5 font-display text-base font-bold">{s.v}</div>
                  </div>
                ))}
              </div>

              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {selected.facts.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
