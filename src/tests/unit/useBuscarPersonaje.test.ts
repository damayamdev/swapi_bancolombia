import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useBuscarPersonaje } from '@application/hooks/useBuscarPersoanje';
import { BuscarPersonajesUseCase } from '@core/useCases/BuscarPersonajes';
import type { Personaje } from '@core/entities/Personaje';

describe('useBuscarPersonaje', () => {
  let mockUseCase: BuscarPersonajesUseCase;

  const mockCharacters: Personaje[] = [
    {
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
  ];

  beforeEach(() => {
    mockUseCase = {
      execute: vi.fn(),
    } as unknown as BuscarPersonajesUseCase;
  });

  it('debería inicializarse con el estado vacío', () => {
    const { result } = renderHook(() => useBuscarPersonaje(mockUseCase));

    expect(result.current.personajes).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('debería buscar personajes', async () => {
    vi.mocked(mockUseCase.execute).mockResolvedValue(mockCharacters);

    const { result } = renderHook(() => useBuscarPersonaje(mockUseCase));

    await act(async () => {
      await result.current.search('Luke');
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.personajes).toEqual(mockCharacters);
    expect(result.current.error).toBeNull();
    expect(mockUseCase.execute).toHaveBeenCalledWith('Luke');
  });

  it('debería manejar errores de búsqueda', async () => {
    const error = new Error('Search failed');
    vi.mocked(mockUseCase.execute).mockRejectedValue(error);

    const { result } = renderHook(() => useBuscarPersonaje(mockUseCase));

    await act(async () => {
      await result.current.search('Luke');
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.personajes).toEqual([]);
    expect(result.current.error?.message).toBe('Search failed');
  });

  it('debería no buscar con término vacío', async () => {
    const { result } = renderHook(() => useBuscarPersonaje(mockUseCase));

    await act(async () => {
      await result.current.search('');
    });

    expect(result.current.personajes).toEqual([]);
    expect(mockUseCase.execute).not.toHaveBeenCalled();
  });

  it('debería no buscar con término menor a 2 caracteres', async () => {
    const { result } = renderHook(() => useBuscarPersonaje(mockUseCase));

    await act(async () => {
      await result.current.search('L');
    });

    expect(result.current.personajes).toEqual([]);
    expect(mockUseCase.execute).not.toHaveBeenCalled();
  });

  it('debería limpiar los resultados de búsqueda', async () => {
    vi.mocked(mockUseCase.execute).mockResolvedValue(mockCharacters);

    const { result } = renderHook(() => useBuscarPersonaje(mockUseCase));

    await act(async () => {
      await result.current.search('Luke');
    });

    await waitFor(() => {
      expect(result.current.personajes).toEqual(mockCharacters);
    });

    act(() => {
      result.current.clear();
    });

    expect(result.current.personajes).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('debería recortar el término de búsqueda', async () => {
    vi.mocked(mockUseCase.execute).mockResolvedValue(mockCharacters);

    const { result } = renderHook(() => useBuscarPersonaje(mockUseCase));

    await act(async () => {
      await result.current.search('  Luke  ');
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockUseCase.execute).toHaveBeenCalledWith('  Luke  ');
  });
});
