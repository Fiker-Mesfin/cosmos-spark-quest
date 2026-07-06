const API = "http://localhost:5000/api";

export interface SpaceObject {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  thumbnail: string | null;
}

export async function getObjects(): Promise<SpaceObject[]> {
  const response = await fetch(`${API}/explore`);

  if (!response.ok) {
    throw new Error("Failed to load objects");
  }

  return response.json();
}
