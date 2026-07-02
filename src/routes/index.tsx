import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Orbit, Sparkles, Telescope, Globe2 } from "lucide-react";
import heroNebula from "@/assets/hero-nebula.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PLANETS, OBJECTS } from "@/lib/space-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cosmos Explorer — Journey Through the Universe" },
      { name: "description", content: "An interactive 3D space learning platform. Fly through the solar system, click any planet, and discover black holes, galaxies, nebulae and more." },
      { property: "og:title", content: "Cosmos Explorer — Journey Through the Universe" },
      { property: "og:description", content: "Learn astronomy through interactive 3D visualization and rich, curated content." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-void text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-16">
        <img
          src={heroNebula}
          alt="Deep space nebula"
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void/40 via-void/70 to-void" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Interactive · 3D · Educational
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              The universe,{" "}
              <span className="bg-cosmic-gradient bg-clip-text text-transparent text-glow">
                one click away
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Cosmos Explorer turns astronomy into an experience. Fly through a live 3D solar system,
              step inside a black hole, and chart the story of everything — from the Big Bang to distant exoplanets.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/solar-system"
                className="group inline-flex items-center gap-2 rounded-full bg-cosmic-gradient px-6 py-3 text-sm font-semibold text-void ring-glow transition-transform hover:scale-105"
              >
                Launch the 3D Solar System
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-white/10"
              >
                Explore the encyclopedia
              </Link>
            </div>

            {/* Stat strip */}
            <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { k: "8", v: "Planets in 3D" },
                { k: "12+", v: "Deep space objects" },
                { k: "13.8B", v: "Years of history" },
                { k: "∞", v: "Curiosity fuel" },
              ].map((s) => (
                <div key={s.v} className="border-l border-white/10 pl-4">
                  <div className="font-display text-2xl font-bold text-accent sm:text-3xl">{s.k}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-white/5 bg-starfield py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              A new way to learn
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Learn space by <em className="not-italic bg-cosmic-gradient bg-clip-text text-transparent">exploring it</em>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Every concept is paired with visuals, real data, and interactive scenes.
              No walls of text — just discovery.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Orbit, title: "Live Solar System",
                desc: "Rotate, zoom and pilot through a real-time 3D solar system. Click any planet for facts, orbit data, and moons." },
              { icon: Telescope, title: "Deep Space Objects",
                desc: "Curated pages on black holes, galaxies, nebulae, pulsars, quasars, comets and exoplanets — with formation and composition." },
              { icon: Globe2, title: "Zoom the Universe",
                desc: "Journey outward from Earth to the observable universe, understanding scale at every step." },
              { icon: Sparkles, title: "Beautiful & Fast",
                desc: "Built with modern web tech — Three.js, React 19, TanStack Start. Runs smoothly in any browser." },
            ].map((f) => (
              <div key={f.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-accent/40 hover:bg-white/[0.05]">
                <div className="mb-5 inline-grid h-11 w-11 place-items-center rounded-xl bg-cosmic-gradient text-void">
                  <f.icon className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <h3 className="font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cosmic-gradient opacity-0 blur-3xl transition-opacity group-hover:opacity-20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANETS STRIP */}
      <section className="border-t border-white/5 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                The Solar System
              </div>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Meet the neighbors
              </h2>
            </div>
            <Link
              to="/solar-system"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-foreground"
            >
              Open 3D view <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {PLANETS.map((p) => (
              <div
                key={p.slug}
                className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-transform hover:-translate-y-1"
              >
                <div
                  className="h-16 w-16 rounded-full animate-float-slow"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${p.color}, #000 90%)`,
                    boxShadow: `0 0 30px -5px ${p.color}80`,
                  }}
                />
                <div className="mt-3 text-sm font-semibold">{p.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{p.distanceAu} AU</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEYOND THE SOLAR SYSTEM */}
      <section className="border-t border-white/5 bg-starfield py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Deep Space
              </div>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Beyond our system
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Black holes that swallow light. Galaxies with a trillion stars. Nurseries where new suns ignite.
              </p>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-foreground"
            >
              Full encyclopedia <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OBJECTS.slice(0, 6).map((o) => (
              <Link
                key={o.slug}
                to="/explore/$slug"
                params={{ slug: o.slug }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-accent/40"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="h-14 w-14 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${o.color}, #000 85%)`,
                      boxShadow: `0 0 40px -5px ${o.color}90`,
                    }}
                  />
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {o.category}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{o.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{o.tagline}</p>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-accent">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to leave the atmosphere?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Click a planet. Chase a comet. Fall into a black hole. It's all one click away.
          </p>
          <div className="mt-10">
            <Link
              to="/solar-system"
              className="inline-flex items-center gap-2 rounded-full bg-cosmic-gradient px-8 py-4 text-base font-semibold text-void ring-glow transition-transform hover:scale-105"
            >
              Begin exploration <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
