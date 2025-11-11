import { useState, useEffect, useCallback, useRef } from 'react';
import type { Personaje } from '@core/entities/Personaje';
import { PersonajeMapper } from '@infrastructure/mappers/PersonajeMapper';
import { swapiClient } from '@infrastructure/api/SwapiClient';

interface UsePersonajeListaResult {
  personajes: Personaje[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
}

export const usePersonajeLista = (): UsePersonajeListaResult => {
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isLoadingRef = useRef(false);

  const loadPersonajes = useCallback(async (pageNumber: number) => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setLoading(true);
      setError(null);

      const response = await swapiClient.getAllPersonajes(pageNumber);

      const mappedPersonajes = response.results
        .filter((char) => char && char.name)
        .map((char) => {
          try {
            return PersonajeMapper.toDomain(char);
          } catch (err) {
            console.warn('Error al mapear personajes:', char, err);
            return null;
          }
        })
        .filter((char): char is Personaje => char !== null);

      setPersonajes((prev) => [...prev, ...mappedPersonajes]);
      setHasMore(response.next !== null);
    } catch (err) {
      console.error('Error cargando personajes:', err);
      setError(err instanceof Error ? err : new Error('Fallo al cargar personajes'));
      setHasMore(false);
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!isLoadingRef.current && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore]);

  useEffect(() => {
    if (page > 1) {
      loadPersonajes(page);
    }
  }, [page, loadPersonajes]);

  useEffect(() => {
    loadPersonajes(1);
  }, [loadPersonajes]);

  return {
    personajes,
    loading,
    error,
    hasMore,
    loadMore,
  };
};
