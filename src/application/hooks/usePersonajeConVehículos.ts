import { useState, useEffect, useCallback } from 'react';
import { ObtenerPersonajeConVehículosUseCase } from '@core/useCases/ObtenerPersonajeConVehículos';
import type { PersonajeConVehiculos } from '@core/useCases/ObtenerPersonajeConVehículos';

interface UsePersonajeConVehiculosResult {
  data: PersonajeConVehiculos | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const usePersonajeConVehiculos = (
  characterId: string,
  useCase: ObtenerPersonajeConVehículosUseCase
): UsePersonajeConVehiculosResult => {
  const [data, setData] = useState<PersonajeConVehiculos | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    if (!characterId) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await useCase.execute(characterId);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [characterId, useCase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
