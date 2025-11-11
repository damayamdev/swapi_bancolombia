import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { usePersonajeConVehiculos } from '@application/hooks/usePersonajeConVehículos';
import { ObtenerPersonajeConVehículosUseCase } from '@core/useCases/ObtenerPersonajeConVehículos';
import type { PersonajeConVehiculos } from '@core/useCases/ObtenerPersonajeConVehículos';

describe('usePersonajeConVehiculos', () => {
  let mockUseCase: ObtenerPersonajeConVehículosUseCase;

  const mockData: PersonajeConVehiculos = {
    personaje: {
      id: '1',
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hairColor: 'blond',
      skinColor: 'fair',
      eyeColor: 'blue',
      birthYear: '19BBY',
      gender: 'male',
      vehicleUrls: [],
    },
    vehiculos: [],
  };

  beforeEach(() => {
    mockUseCase = {
      execute: vi.fn(),
    } as unknown as ObtenerPersonajeConVehículosUseCase;
  });

  it('debería recuperar los datos de caracteres al montar', async () => {
    vi.mocked(mockUseCase.execute).mockResolvedValue(mockData);

    const { result } = renderHook(() => usePersonajeConVehiculos('1', mockUseCase));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(mockUseCase.execute).toHaveBeenCalledWith('1');
  });

  it('debería manejar errores de manera adecuada', async () => {
    const error = new Error('Failed to fetch');
    vi.mocked(mockUseCase.execute).mockRejectedValue(error);

    const { result } = renderHook(() => usePersonajeConVehiculos('1', mockUseCase));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error?.message).toBe('Failed to fetch');
  });

  it('debería manejar characterId vacío', async () => {
    const { result } = renderHook(() => usePersonajeConVehiculos('', mockUseCase));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(mockUseCase.execute).not.toHaveBeenCalled();
  });

  it('debería volver a buscar datos cuando se llame a refetch', async () => {
    vi.mocked(mockUseCase.execute).mockResolvedValue(mockData);

    const { result } = renderHook(() => usePersonajeConVehiculos('1', mockUseCase));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockUseCase.execute).toHaveBeenCalledTimes(1);

    result.current.refetch();

    await waitFor(() => {
      expect(mockUseCase.execute).toHaveBeenCalledTimes(2);
    });
  });

  it('debería manejar la respuesta nula del caso de uso', async () => {
    vi.mocked(mockUseCase.execute).mockResolvedValue(null);

    const { result } = renderHook(() => usePersonajeConVehiculos('999', mockUseCase));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
