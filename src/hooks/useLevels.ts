import { useCallback, useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface Niveles {
  id: number;
  nivel: string;
  preguntas: number;
}

export function useLevels() {
  const [levels, setLevels] = useState<Niveles[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLevels = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/niveles.php`);

      const data = (await response.json()) as Niveles[];
      setLevels(data);
      console.log("levels 1", data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      console.log("levels 2");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLevels();
  }, []);

  return { levels, loading, error };
}
