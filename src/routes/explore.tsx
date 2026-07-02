import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { OBJECTS, type ObjectCategory } from "@/lib/space-data";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Space Encyclopedia — Cosmos Explorer" },
      { name: "description", content: "Deep space objects explained — black holes, galaxies, nebulae, pulsars, quasars, comets and exoplanets." },
      { property: "og:title", content: "Space Encyclopedia — Cosmos Explorer" },
      { property: "og:description", content: "Curated pages on every kind of object in the cosmos." },
    ],
  }),
  component: ExploreLayout,
});

const categories: (ObjectCategory | "All")[] = [
  "All", "Star", "Planet", "Dwarf Planet", "Black Hole", "Galaxy", "Nebula", "Asteroid", "Comet", "Exoplanet", "Pulsar", "Quasar",
];

function ExploreLayout() {
  const matches = useMatches();
  const isDetail = matches.some((m) => m.routeId === "/explore/$slug");
  if (isDetail) {
    return (
      <div className="min-h-screen bg-void text-foreground">
        <SiteHeader />
        <Outlet />
        <SiteFooter />
      </div>
    );
  }
  return <ExploreIndex />;
}

function ExploreIndex() {
  const [filter, setFilter] = useState<ObjectCategory | "All">("All");
  const items = filter === "All" ? OBJECTS : OBJECTS.filter((o) => o.category === filter);

  return (
    <div className="min-h-screen bg-void text-foreground">
      <SiteHeader />
      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Encyclopedia
            </div>
            <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">
              Every kind of{" "}
              <span className="bg-cosmic-gradient bg-clip-text text-transparent">cosmos</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              From the Sun to the farthest quasar — curated facts, formation stories, composition, and stunning scale comparisons.
            </p>
          </motion.div>

          {/* Filter chips */}
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                  filter === c
                    ? "border-accent bg-accent text-void"
                    : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((o, i) => (
              <motion.div
                key={o.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to="/explore/$slug"
                  params={{ slug: o.slug }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-accent/40 hover:bg-white/[0.06]"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="h-16 w-16 rounded-full animate-float-slow"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${o.color}, #000 85%)`,
                        boxShadow: `0 0 50px -8px ${o.color}90`,
                      }}
                    />
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {o.category}
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-bold">{o.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {o.tagline}
                  </p>
                  <div className="mt-5 text-xs font-semibold text-accent">Read more →</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
