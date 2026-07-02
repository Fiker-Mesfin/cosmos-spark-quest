export type ObjectCategory =
  | "Planet"
  | "Dwarf Planet"
  | "Star"
  | "Black Hole"
  | "Galaxy"
  | "Nebula"
  | "Asteroid"
  | "Comet"
  | "Exoplanet"
  | "Pulsar"
  | "Quasar";

export interface Planet {
  slug: string;
  name: string;
  color: string;      // hex, for 3D + UI
  emissive?: string;
  radius: number;     // relative scene units
  orbit: number;      // orbit radius in scene units
  speed: number;      // orbital speed multiplier
  ring?: boolean;
  tagline: string;
  distanceAu: number;
  dayHours: number;
  yearDays: number;
  diameterKm: number;
  moons: number;
  facts: string[];
}

export const SUN = {
  color: "#ffb347",
  emissive: "#ff7a1a",
  radius: 3.2,
};

export const PLANETS: Planet[] = [
  {
    slug: "mercury", name: "Mercury", color: "#b8b0a8", radius: 0.35, orbit: 5.5, speed: 1.6,
    tagline: "The Sun's tiny scorched neighbor.",
    distanceAu: 0.39, dayHours: 4222.6, yearDays: 88, diameterKm: 4879, moons: 0,
    facts: [
      "A day on Mercury lasts longer than its year.",
      "Surface temperatures swing from -173°C at night to 427°C at noon.",
      "Its iron core makes up ~60% of the planet's mass.",
    ],
  },
  {
    slug: "venus", name: "Venus", color: "#e8b76a", radius: 0.55, orbit: 7.2, speed: 1.2,
    tagline: "Earth's toxic, oven-hot twin.",
    distanceAu: 0.72, dayHours: 2802, yearDays: 225, diameterKm: 12104, moons: 0,
    facts: [
      "Surface pressure is 92× Earth's — like being 900 m under the ocean.",
      "It spins backwards compared to most planets.",
      "Clouds of sulfuric acid trap heat, making it the hottest planet.",
    ],
  },
  {
    slug: "earth", name: "Earth", color: "#3aa1e0", emissive: "#0a4a7a", radius: 0.6, orbit: 9.2, speed: 1,
    tagline: "The pale blue dot we call home.",
    distanceAu: 1, dayHours: 24, yearDays: 365.25, diameterKm: 12742, moons: 1,
    facts: [
      "The only known world with liquid water on its surface.",
      "Its magnetic field shields us from lethal solar radiation.",
      "Earth is 4.54 billion years old — 1/3 the age of the universe.",
    ],
  },
  {
    slug: "mars", name: "Mars", color: "#c1440e", radius: 0.45, orbit: 11.5, speed: 0.82,
    tagline: "The rusted red planet of ancient rivers.",
    distanceAu: 1.52, dayHours: 24.6, yearDays: 687, diameterKm: 6779, moons: 2,
    facts: [
      "Olympus Mons is the tallest volcano in the solar system — 22 km high.",
      "Its red color comes from iron oxide dust — rust.",
      "Evidence of ancient rivers and lakes covers the surface.",
    ],
  },
  {
    slug: "jupiter", name: "Jupiter", color: "#d8a86a", radius: 1.6, orbit: 15.5, speed: 0.44,
    tagline: "King of the planets, a failed star.",
    distanceAu: 5.2, dayHours: 9.9, yearDays: 4333, diameterKm: 139820, moons: 95,
    facts: [
      "The Great Red Spot is a storm larger than Earth, raging for 350+ years.",
      "Jupiter has 95 confirmed moons — Ganymede is bigger than Mercury.",
      "Its gravity shields inner planets from many comet impacts.",
    ],
  },
  {
    slug: "saturn", name: "Saturn", color: "#e0c68a", radius: 1.35, orbit: 19.5, speed: 0.32, ring: true,
    tagline: "Ringed jewel of the solar system.",
    distanceAu: 9.58, dayHours: 10.7, yearDays: 10756, diameterKm: 116460, moons: 146,
    facts: [
      "Saturn is less dense than water — it would float.",
      "Its rings are ~90% water ice, only ~10 m thick in places.",
      "Titan, its largest moon, has lakes of liquid methane.",
    ],
  },
  {
    slug: "uranus", name: "Uranus", color: "#7ad3d6", radius: 0.95, orbit: 23, speed: 0.22,
    tagline: "The tipped-over ice giant.",
    distanceAu: 19.2, dayHours: 17.2, yearDays: 30687, diameterKm: 50724, moons: 27,
    facts: [
      "Uranus rotates on its side — its poles face the Sun.",
      "It's the coldest planetary atmosphere in the solar system: -224°C.",
      "Its blue color comes from methane in the upper atmosphere.",
    ],
  },
  {
    slug: "neptune", name: "Neptune", color: "#3e5cc7", radius: 0.92, orbit: 26.5, speed: 0.17,
    tagline: "Windy blue outpost at the edge.",
    distanceAu: 30.05, dayHours: 16.1, yearDays: 60190, diameterKm: 49244, moons: 14,
    facts: [
      "Winds on Neptune reach 2,100 km/h — the fastest in the solar system.",
      "Discovered through math before it was ever seen through a telescope.",
      "One Neptunian year equals 165 Earth years.",
    ],
  },
];

export interface SpaceObject {
  slug: string;
  name: string;
  category: ObjectCategory;
  tagline: string;
  color: string;      // gradient anchor
  facts: string[];
  formation: string;
  composition: string;
  discoveries: string;
  sizeComparison: string;
}

export const OBJECTS: SpaceObject[] = [
  {
    slug: "sun", name: "The Sun", category: "Star",
    tagline: "A middle-aged G-type main sequence star holding our system together.",
    color: "#ffb347",
    facts: [
      "The Sun contains 99.86% of the solar system's mass.",
      "Its core reaches 15 million °C, fusing 600 million tons of hydrogen per second.",
      "Light from the Sun takes 8 minutes 20 seconds to reach Earth.",
    ],
    formation: "Formed 4.6 billion years ago from the collapse of a giant molecular cloud.",
    composition: "~73% hydrogen, ~25% helium, plus traces of oxygen, carbon, iron.",
    discoveries: "Solar wind (1958), coronal mass ejections, 11-year magnetic cycle.",
    sizeComparison: "1.3 million Earths would fit inside the Sun.",
  },
  {
    slug: "black-holes", name: "Black Holes", category: "Black Hole",
    tagline: "Regions where gravity is so strong not even light can escape.",
    color: "#7c3aed",
    facts: [
      "The first image of a black hole (M87*) was released in 2019.",
      "Supermassive black holes anchor the centers of most galaxies.",
      "Sagittarius A* — the Milky Way's central black hole — has 4.3 million solar masses.",
    ],
    formation: "Stellar-mass black holes form when massive stars collapse in supernovae.",
    composition: "A singularity of unknown state surrounded by an event horizon.",
    discoveries: "Predicted by Einstein's general relativity; confirmed by gravitational waves in 2015.",
    sizeComparison: "A stellar black hole can pack the Sun's mass into a 6 km ball.",
  },
  {
    slug: "milky-way", name: "The Milky Way", category: "Galaxy",
    tagline: "Our barred spiral home of 100–400 billion stars.",
    color: "#a78bfa",
    facts: [
      "The Milky Way is ~100,000 light-years across.",
      "It contains at least 100 billion planets.",
      "The Sun takes 225 million years to orbit the galactic center.",
    ],
    formation: "Built up over 13.6 billion years from mergers of smaller galaxies.",
    composition: "Stars, gas, dust, and a vast dark matter halo — plus Sagittarius A*.",
    discoveries: "Its spiral structure was mapped through radio surveys of hydrogen gas.",
    sizeComparison: "If the Milky Way were the size of the USA, the Sun would be a grain of sand.",
  },
  {
    slug: "andromeda", name: "Andromeda Galaxy", category: "Galaxy",
    tagline: "Our nearest large galactic neighbor, on a collision course with us.",
    color: "#22d3ee",
    facts: [
      "Andromeda contains ~1 trillion stars — twice the Milky Way.",
      "It's approaching us at 110 km/s and will collide in ~4.5 billion years.",
      "It's the most distant object visible to the naked eye at 2.5 million light-years.",
    ],
    formation: "Formed ~10 billion years ago from mergers, similar to the Milky Way.",
    composition: "Spiral disk of stars, dust, and gas with a supermassive black hole core.",
    discoveries: "Edwin Hubble proved it was a separate galaxy in 1923.",
    sizeComparison: "Roughly 220,000 light-years across — twice the Milky Way.",
  },
  {
    slug: "orion-nebula", name: "Orion Nebula", category: "Nebula",
    tagline: "A stellar nursery visible to the naked eye.",
    color: "#f472b6",
    facts: [
      "One of the closest star-forming regions to Earth (~1,344 light-years).",
      "Young stars inside are only 300,000 years old.",
      "Located in the sword of the Orion constellation.",
    ],
    formation: "A dense pocket of hydrogen collapsing into new stars.",
    composition: "Mostly hydrogen and helium gas, with dust and heavier elements.",
    discoveries: "Hubble revealed proplyds — infant solar systems forming inside it.",
    sizeComparison: "Spans 24 light-years — enough to hold thousands of solar systems.",
  },
  {
    slug: "pluto", name: "Pluto", category: "Dwarf Planet",
    tagline: "The most famous ice world of the Kuiper Belt.",
    color: "#d4a373",
    facts: [
      "Reclassified as a dwarf planet in 2006.",
      "A day on Pluto lasts 6.4 Earth days; a year, 248 years.",
      "Its heart-shaped plain 'Tombaugh Regio' is made of nitrogen ice.",
    ],
    formation: "Coalesced 4.5 billion years ago in the outer solar system.",
    composition: "Rock and ice — water, methane, and nitrogen frozen solid.",
    discoveries: "New Horizons flew by in 2015, returning the first close-up images.",
    sizeComparison: "About 2/3 the diameter of Earth's Moon.",
  },
  {
    slug: "halley", name: "Halley's Comet", category: "Comet",
    tagline: "A dirty snowball on a 76-year journey around the Sun.",
    color: "#93c5fd",
    facts: [
      "Halley returns every 75–76 years — next visible in 2061.",
      "Its recorded observations go back to 240 BCE.",
      "Its nucleus is a 15 km-wide chunk of ice, dust, and rock.",
    ],
    formation: "Originated in the Kuiper Belt / scattered disc billions of years ago.",
    composition: "Water ice, dust, frozen gases, and organic compounds.",
    discoveries: "Edmond Halley predicted its 1758 return, proving comets orbit the Sun.",
    sizeComparison: "Nucleus smaller than Manhattan, but its tail can stretch 100 million km.",
  },
  {
    slug: "vesta", name: "4 Vesta", category: "Asteroid",
    tagline: "The second-largest body in the asteroid belt.",
    color: "#a1a1aa",
    facts: [
      "Vesta is 525 km across — visible to the naked eye at times.",
      "It has a giant impact crater covering most of its south pole.",
      "Fragments of Vesta have been found as meteorites on Earth.",
    ],
    formation: "One of the last surviving protoplanets from the early solar system.",
    composition: "Rocky, with an iron-nickel core, mantle, and basaltic crust.",
    discoveries: "NASA's Dawn mission orbited Vesta from 2011–2012.",
    sizeComparison: "About the size of the U.S. state of Arizona.",
  },
  {
    slug: "kepler-186f", name: "Kepler-186f", category: "Exoplanet",
    tagline: "The first Earth-sized planet found in a habitable zone.",
    color: "#4ade80",
    facts: [
      "Located 500 light-years away in the constellation Cygnus.",
      "Only ~10% larger than Earth.",
      "Orbits a red dwarf star in the 'Goldilocks zone' where water could be liquid.",
    ],
    formation: "Likely formed from a protoplanetary disk around its red dwarf host.",
    composition: "Unknown — possibly rocky with a thin atmosphere.",
    discoveries: "Discovered by NASA's Kepler space telescope in 2014.",
    sizeComparison: "Approximately the size of Earth, orbiting a smaller cooler star.",
  },
  {
    slug: "crab-pulsar", name: "Crab Pulsar", category: "Pulsar",
    tagline: "A city-sized neutron star spinning 30 times per second.",
    color: "#67e8f9",
    facts: [
      "Born in a supernova observed by Chinese astronomers in 1054 CE.",
      "Its beams sweep past Earth every 33 milliseconds.",
      "One teaspoon of pulsar material would weigh 6 billion tons on Earth.",
    ],
    formation: "The collapsed core of a massive star that went supernova.",
    composition: "Neutron-degenerate matter — denser than an atomic nucleus.",
    discoveries: "First identified as a pulsar in 1968.",
    sizeComparison: "About 20 km wide — the size of a small city.",
  },
  {
    slug: "3c-273", name: "3C 273", category: "Quasar",
    tagline: "The first quasar ever identified — a galaxy-eating engine.",
    color: "#fbbf24",
    facts: [
      "Shines with the light of 4 trillion Suns.",
      "Located 2.4 billion light-years away.",
      "Powered by a supermassive black hole 886 million times the Sun's mass.",
    ],
    formation: "Quasars form when supermassive black holes rapidly consume gas.",
    composition: "Accretion disk of superheated plasma orbiting a black hole.",
    discoveries: "First identified as a quasi-stellar radio source in 1963.",
    sizeComparison: "The engine is smaller than our solar system but outshines galaxies.",
  },
  {
    slug: "eagle-nebula", name: "Eagle Nebula", category: "Nebula",
    tagline: "Home of the iconic 'Pillars of Creation'.",
    color: "#c084fc",
    facts: [
      "Located 7,000 light-years away in Serpens.",
      "The Pillars of Creation are 4–5 light-years tall.",
      "Contains the young open cluster NGC 6611.",
    ],
    formation: "Actively forming new stars from gravitational collapse of gas.",
    composition: "Hydrogen gas, dust, and newborn stars.",
    discoveries: "Hubble's 1995 Pillars of Creation image is one of astronomy's most famous.",
    sizeComparison: "About 70 by 55 light-years across.",
  },
];

export function getObject(slug: string) {
  return OBJECTS.find((o) => o.slug === slug);
}
export function getPlanet(slug: string) {
  return PLANETS.find((p) => p.slug === slug);
}
