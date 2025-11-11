import { useState, useCallback } from 'react';
import { BuscarPersonajesUseCase } from '@core/useCases/BuscarPersonajes';
import type { Personaje } from '@core/entities/Personaje';

interface UseBuscarPersonajeResult {
  personajes: Personaje[];
  loading: boolean;
  error: Error | null;
  search: (term: string) => Promise<void>;
  clear: () => void;
}

export const useBuscarPersonaje = (useCase: BuscarPersonajesUseCase): UseBuscarPersonajeResult => {
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(
    async (term: string): Promise<void> => {
      if (!term || term.trim().length < 2) {
        setPersonajes([]);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const results = await useCase.execute(term);
        setPersonajes(results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setPersonajes([]);
      } finally {
        setLoading(false);
      }
    },
    [useCase]
  );

  const clear = useCallback((): void => {
    setPersonajes([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    personajes,
    loading,
    error,
    search,
    clear,
  };
};
