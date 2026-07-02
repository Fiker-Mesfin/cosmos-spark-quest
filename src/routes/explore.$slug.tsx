import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getObject, OBJECTS } from "@/lib/space-data";

export const Route = createFileRoute("/explore/$slug")({
  loader: ({ params }) => {
    const object = getObject(params.slug);
    if (!object) throw notFound();
    return { object };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — Cosmos Explorer" }, { name: "robots", content: "noindex" }] };
    }
    const o = loaderData.object;
    return {
      meta: [
        { title: `${o.name} — Cosmos Explorer` },
        { name: "description", content: o.tagline },
        { property: "og:title", content: `${o.name} — Cosmos Explorer` },
        { property: "og:description", content: o.tagline },
      ],
    };
  },
  component: ObjectPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
      <h1 className="font-display text-3xl font-bold">Object not found</h1>
      <p className="mt-3 text-muted-foreground">That page is drifting somewhere in the void.</p>
      <Link to="/explore" className="mt-6 inline-block text-sm font-semibold text-accent">← Back to encyclopedia</Link>
    </div>
  ),
});

function ObjectPage() {
  const { object } = Route.useLoaderData();
  const related = OBJECTS.filter((o) => o.category === object.category && o.slug !== object.slug).slice(0, 3);

  const sections = [
    { title: "Formation", body: object.formation },
    { title: "Composition", body: object.composition },
    { title: "Discoveries", body: object.discoveries },
    { title: "Size comparison", body: object.sizeComparison },
  ];

  return (
    <main className="relative pt-24">
      {/* Backdrop glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-16 -z-10 h-[500px] opacity-30 blur-3xl"
        style={{ background: `radial-gradient(ellipse at top, ${object.color}, transparent 60%)` }}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link to="/explore" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Encyclopedia
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
        >
          <div
            className="h-32 w-32 shrink-0 rounded-full animate-float-slow"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${object.color}, #000 85%)`,
              boxShadow: `0 0 80px -10px ${object.color}`,
            }}
          />
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {object.category}
            </div>
            <h1 className="mt-2 font-display text-5xl font-bold tracking-tight sm:text-6xl">{object.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{object.tagline}</p>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">Key facts</h2>
          <ul className="mt-5 space-y-3">
            {object.facts.map((f, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed text-foreground/90">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cosmic-gradient" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {sections.map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent">More {object.category.toLowerCase()}s</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/explore/$slug"
                params={{ slug: r.slug }}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-accent/40"
              >
                <div
                  className="h-10 w-10 shrink-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${r.color}, #000 85%)`,
                    boxShadow: `0 0 20px ${r.color}80`,
                  }}
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{r.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{r.tagline}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
