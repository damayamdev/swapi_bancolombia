import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SwapiClient } from '@infrastructure/api/SwapiClient';
import { ApiError, NetworkError, NotFoundError } from '@infrastructure/api/types';

describe('SwapiClient', () => {
  let client: SwapiClient;

  beforeEach(() => {
    client = new SwapiClient();
    vi.clearAllMocks();
  });

  describe('Listar personaje', () => {
    it('debe obtener y devolver datos de caracteres', async () => {
      const mockResponse = {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        vehicles: [
          'https://swapi.dev/api/vehicles/14/',
          'https://swapi.dev/api/vehicles/30/',
        ],
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await client.getPersonaje('1');

      expect(result).toEqual(mockResponse);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://swapi.dev/api/people/1/',
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    });

    it('debe lanzar NotFoundError cuando no se encuentra el personaje', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(client.getPersonaje('9999')).rejects.toThrow(NotFoundError);
      await expect(client.getPersonaje('9999')).rejects.toThrow('Recurso no encontrado');
    });

    it('debe lanzar ApiError para errores de servidor', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(client.getPersonaje('1')).rejects.toThrow(ApiError);
      await expect(client.getPersonaje('1')).rejects.toThrow(
        'Error HTTP: 500'
      );
    });

    it('debe lanzar NetworkError en caso de fallo de red', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network failure'));

      await expect(client.getPersonaje('1')).rejects.toThrow(NetworkError);
      await expect(client.getPersonaje('1')).rejects.toThrow('Ocurrió un error de red');
    });

    it('debe lanzar ApiError cuando la respuesta no es ok', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
      });

      await expect(client.getPersonaje('1')).rejects.toThrow(ApiError);
    });

    it('debe lanzar NetworkError en caso de timeout con señal de abortar', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(
        Object.assign(new Error('La operación fue abortada.'), { name: 'AbortError' })
      );

      await expect(client.getPersonaje('1')).rejects.toThrow(NetworkError);
      await expect(client.getPersonaje('1')).rejects.toThrow('Tiempo de espera de la solicitud agotado.');
    });
  });

  describe('getVehiculoByUrl', () => {
    it('debe obtener y devolver datos de vehículos', async () => {
      const mockResponse = {
        name: 'X-34 landspeeder',
        model: 'X-34 landspeeder',
        manufacturer: 'SoroSuub Corporation',
        cost_in_credits: '10550',
        length: '3.4',
        max_atmosphering_speed: '250',
        crew: '1',
        passengers: '1',
        cargo_capacity: '5',
        consumables: 'unknown',
        vehicle_class: 'repulsorcraft',
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await client.getVehiculoByUrl('https://swapi.dev/api/vehicles/14/');

      expect(result).toEqual(mockResponse);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://swapi.dev/api/vehicles/14/',
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    });

    it('debe lanzar NotFoundError cuando no se encuentra el vehículo', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(client.getVehiculoByUrl('https://swapi.dev/api/vehicles/9999/')).rejects.toThrow(NotFoundError);
      await expect(client.getVehiculoByUrl('https://swapi.dev/api/vehicles/9999/')).rejects.toThrow('Recurso no encontrado');
    });

    it('debe lanzar ApiError para otros estados de error', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(client.getVehiculoByUrl('https://swapi.dev/api/vehicles/1/')).rejects.toThrow(ApiError);
    });

    it('debe lanzar NetworkError en caso de fallo de red', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Connection refused'));

      await expect(client.getVehiculoByUrl('https://swapi.dev/api/vehicles/1/')).rejects.toThrow(NetworkError);
      await expect(client.getVehiculoByUrl('https://swapi.dev/api/vehicles/1/')).rejects.toThrow('Ocurrió un error de red');
    });
  });

  describe('buscarPersonajes', () => {
    it('debe obtener y devolver resultados de búsqueda', async () => {
      const mockResponse = {
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            vehicles: [],
          },
        ],
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await client.buscarPersonajes('Luke');

      expect(result).toEqual(mockResponse);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://swapi.dev/api/people/?search=Luke',
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    });

    it('debe devolver resultados vacíos cuando no se encuentran coincidencias', async () => {
      const mockResponse = {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await client.buscarPersonajes('NonexistentCharacter');

      expect(result.count).toBe(0);
      expect(result.results).toHaveLength(0);
    });

    it('debe lanzar ApiError en caso de error del servidor', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(client.buscarPersonajes('Luke')).rejects.toThrow(ApiError);
    });

    it('debe lanzar NetworkError en caso de fallo de red', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('DNS failure'));

      await expect(client.buscarPersonajes('Luke')).rejects.toThrow(NetworkError);
      await expect(client.buscarPersonajes('Luke')).rejects.toThrow('Ocurrió un error de red');
    });
  });

  describe('Error Handling', () => {
    it('debe manejar errores de análisis JSON', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      await expect(client.getPersonaje('1')).rejects.toThrow(ApiError);
      await expect(client.getPersonaje('1')).rejects.toThrow('Respuesta JSON no válida');
    });

    it('debe manejar la limpieza del controlador de abortar correctamente', async () => {
      const mockResponse = { name: 'Test', height: '180' };
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      await client.getPersonaje('1');
      
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    });
  });
});
