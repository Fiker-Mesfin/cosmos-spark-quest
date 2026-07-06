import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
// 1. Import both lookup functions from your space-data
import { getObject, getPlanet } from "@/lib/space-data";

const urlToBackendMap: Record<string, string> = {
  blackholes: "blackholes",
  sun: "the sun",
  "milky-way": "milky way",
  andromeda: "andromeda galaxy",
  "orion-nebula": "orion nebula",
  halley: "halley's comet",
  vesta: "4 vesta",
  "kepler-186f": "kepler-186f",
  "crab-pulsar": "crab pulsar",
  "3c-273": "3c 273",
  "eagle-nebula": "eagle nebula",
  // Your planet slugs generally match their API names,
  // but you can add explicit mappings here if your backend uses capitals like "Mercury"
  mercury: "mercury",
  venus: "venus",
  earth: "earth",
  mars: "mars",
  jupiter: "jupiter",
  saturn: "saturn",
  uranus: "uranus",
  neptune: "neptune",
};

export const Route = createFileRoute("/explore/$slug")({
  loader: async ({ params }) => {
    const backendSlug = urlToBackendMap[params.slug] || params.slug.replace(/-/g, " ");
    const safeSlug = encodeURIComponent(backendSlug);

    const res = await fetch(`http://localhost:5000/api/space/${safeSlug}`);

    if (!res.ok) throw notFound();

    return { object: await res.json() };
  },

  component: DetailPage,
});

function DetailPage() {
  const { object } = Route.useLoaderData();
  const { slug } = Route.useParams();

  // 2. Try looking up in OBJECTS first. If undefined, look inside PLANETS!
  const localObject = getObject(slug) || getPlanet(slug);

  return (
    <main className="min-h-screen bg-void text-white pt-24 px-6">
      <Link to="/explore" className="text-gray-400 flex gap-2">
        <ArrowLeft /> Back
      </Link>

      {/* HEADER */}
      <motion.div className="mt-8 flex gap-8 items-center">
        <img
          src={object.image || object.thumbnail}
          className="w-40 h-40 rounded-full object-cover"
          alt={object.name || object.title}
        />

        <div>
          <h1 className="text-5xl font-bold">{object.name || object.title}</h1>
          <p className="text-gray-300 mt-3 max-w-2xl">{object.overview}</p>
        </div>
      </motion.div>

      {/* KEY FACTS */}
      <section className="mt-12">
        <h2 className="text-xl text-accent mb-4">Key Facts</h2>

        <ul className="space-y-3">
          {(localObject?.facts || []).map((fact: string, index: number) => (
            <li key={index} className="flex gap-3 text-gray-200">
              <span className="text-accent">•</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ADDITIONAL DETAILED DATA (Now renders for planets too!) */}
      {localObject && (
        <section className="mt-12 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-accent">Formation</h3>
            <p className="mt-3 text-gray-300 leading-8">{localObject.formation}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-accent">Composition</h3>
            <p className="mt-3 text-gray-300 leading-8">{localObject.composition}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-accent">Discoveries</h3>
            <p className="mt-3 text-gray-300 leading-8">{localObject.discoveries}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-accent">Size Comparison</h3>
            <p className="mt-3 text-gray-300 leading-8">{localObject.sizeComparison}</p>
          </div>
        </section>
      )}

      {/* YOUTUBE VIDEOS */}
      {object.videos?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-accent mb-6">Related Videos</h2>

          <div className="grid gap-8 md:grid-cols-2">
            {object.videos.map(
              (
                video: {
                  youtubeId: string;
                  title: string;
                  thumbnail: string;
                  channel: string;
                },
                i: number,
              ) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-white/10 bg-white/5"
                >
                  <iframe
                    className="w-full aspect-video"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  <div className="p-4">
                    <h3 className="font-semibold text-white">{video.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{video.channel}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>
      )}
    </main>
  );
}
