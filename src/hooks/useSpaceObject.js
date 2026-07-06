import { useEffect, useState } from "react";
import { getSpaceObject } from "../api/spaceApi";

export default function useSpaceObject(name) {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const result = await getSpaceObject(name);

        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [name]);

  return {
    data,

    loading,

    error,
  };
}
