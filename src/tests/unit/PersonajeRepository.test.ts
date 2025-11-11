import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PersonajeRepository } from '@infrastructure/repositories/PersonajeRepository';
import { SwapiClient } from '@infrastructure/api/SwapiClient';
import { NotFoundError } from '@infrastructure/api/types';
import type { SwapiPersonajeResponse } from '@infrastructure/api/types';

describe('PersonajeRepository', () => {
  let repository: PersonajeRepository;
  let mockApiClient: SwapiClient;

  const mockApiResponse: SwapiPersonajeResponse = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [],
    species: [],
    vehicles: ['https://swapi.dev/api/vehicles/14/'],
    starships: [],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/',
  };

  beforeEach(() => {
    mockApiClient = {
      getPersonaje: vi.fn(),
      buscarPersonajes: vi.fn(),
      getVehiculoByUrl: vi.fn(),
    } as unknown as SwapiClient;

    repository = new PersonajeRepository(mockApiClient);
  });

  describe('getCharacterById', () => {
    it('debe devolver el carácter cuando se encuentre', async () => {
      vi.mocked(mockApiClient.getPersonaje).mockResolvedValue(mockApiResponse);

      const character = await repository.getPersonajeById('1');

      expect(character).not.toBeNull();
      expect(character?.id).toBe('1');
      expect(character?.name).toBe('Luke Skywalker');
      expect(mockApiClient.getPersonaje).toHaveBeenCalledWith('1');
    });

    it('debe devolver null cuando no se encuentra el carácter', async () => {
      vi.mocked(mockApiClient.getPersonaje).mockRejectedValue(new NotFoundError('Not found'));

      const character = await repository.getPersonajeById('999');

      expect(character).toBeNull();
    });

    it('debe propagar otros errores', async () => {
      const error = new Error('API Error');
      vi.mocked(mockApiClient.getPersonaje).mockRejectedValue(error);

      await expect(repository.getPersonajeById('1')).rejects.toThrow('API Error');
    });
  });

  describe('buscarPersonajePorNombre', () => {
    it('debe devolver los personajes que coincidan con el término de búsqueda', async () => {
      vi.mocked(mockApiClient.buscarPersonajes).mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: [mockApiResponse], 
      });

      const characters = await repository.buscarPersonajeByName('Luke');

      expect(characters).toHaveLength(1);
      expect(characters[0].name).toBe('Luke Skywalker');
      expect(mockApiClient.buscarPersonajes).toHaveBeenCalledWith('Luke');
    });

    it('debe devolver un array vacío cuando no se encuentran coincidencias', async () => {
      vi.mocked(mockApiClient.buscarPersonajes).mockResolvedValue({
        count: 0,
        next: null,
        previous: null,
        results: [],
      });

      const characters = await repository.buscarPersonajeByName('Nonexistent');

      expect(characters).toEqual([]);
    });

    it('debe manejar errores de la API', async () => {
      const error = new Error('Search failed');
      vi.mocked(mockApiClient.buscarPersonajes).mockRejectedValue(error);

      await expect(repository.buscarPersonajeByName('Luke')).rejects.toThrow('Search failed');
    });
  });
});
