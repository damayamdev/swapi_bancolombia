import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VehiculoRepository } from '@infrastructure/repositories/VehiculoRepository';
import { SwapiClient } from '@infrastructure/api/SwapiClient';
import { NotFoundError } from '@infrastructure/api/types';
import type { SwapiVehiculoResponse } from '@infrastructure/api/types';

describe('VehiculoRepository', () => {
  let repository: VehiculoRepository;
  let mockApiClient: SwapiClient;

  const mockVehicleResponse: SwapiVehiculoResponse = {
    name: 'Snowspeeder',
    model: 't-47 airspeeder',
    manufacturer: 'Incom corporation',
    cost_in_credits: 'unknown',
    length: '4.5',
    max_atmosphering_speed: '650',
    crew: '2',
    passengers: '0',
    cargo_capacity: '10',
    consumables: 'none',
    vehicle_class: 'airspeeder',
    pilots: [],
    films: [],
    created: '2014-12-15T12:22:12Z',
    edited: '2014-12-20T21:30:21.672000Z',
    url: 'https://swapi.dev/api/vehicles/14/',
  };

  beforeEach(() => {
    mockApiClient = {
      getPersonaje: vi.fn(),
      buscarPersonajes: vi.fn(),
      getVehiculoByUrl: vi.fn(),
    } as unknown as SwapiClient;

    repository = new VehiculoRepository(mockApiClient);
  });

  describe('getVehiculoByUrl', () => {
    it('debe devolver el vehículo cuando lo encuentre', async () => {
      vi.mocked(mockApiClient.getVehiculoByUrl).mockResolvedValue(mockVehicleResponse);

      const vehicle = await repository.getVehiculoByUrl('https://swapi.dev/api/vehicles/14/');

      expect(vehicle).not.toBeNull();
      expect(vehicle?.id).toBe('14');
      expect(vehicle?.name).toBe('Snowspeeder');
      expect(mockApiClient.getVehiculoByUrl).toHaveBeenCalledWith(
        'https://swapi.dev/api/vehicles/14/'
      );
    });

    it('debe devolver null cuando el vehículo no se encuentra', async () => {
      vi.mocked(mockApiClient.getVehiculoByUrl).mockRejectedValue(
        new NotFoundError('Not found')
      );

      const vehicle = await repository.getVehiculoByUrl('https://swapi.dev/api/vehicles/999/');

      expect(vehicle).toBeNull();
    });

    it('debe propagar otros errores', async () => {
      const error = new Error('API Error');
      vi.mocked(mockApiClient.getVehiculoByUrl).mockRejectedValue(error);

      await expect(
        repository.getVehiculoByUrl('https://swapi.dev/api/vehicles/14/')
      ).rejects.toThrow('API Error');
    });
  });

  describe('getVehiculosByUrls', () => {
    it('debe devolver múltiples vehículos', async () => {
      const vehicle2 = { ...mockVehicleResponse, url: 'https://swapi.dev/api/vehicles/30/' };

      vi.mocked(mockApiClient.getVehiculoByUrl)
        .mockResolvedValueOnce(mockVehicleResponse)
        .mockResolvedValueOnce(vehicle2);

      const vehicles = await repository.getVehiculosByUrls([
        'https://swapi.dev/api/vehicles/14/',
        'https://swapi.dev/api/vehicles/30/',
      ]);

      expect(vehicles).toHaveLength(2);
      expect(vehicles[0].id).toBe('14');
      expect(vehicles[1].id).toBe('30');
    });

    it('debe filtrar los valores nulos cuando no se encuentran vehículos', async () => {
      vi.mocked(mockApiClient.getVehiculoByUrl)
        .mockResolvedValueOnce(mockVehicleResponse)
        .mockRejectedValueOnce(new NotFoundError('Not found'));

      const vehicles = await repository.getVehiculosByUrls([
        'https://swapi.dev/api/vehicles/14/',
        'https://swapi.dev/api/vehicles/999/',
      ]);

      expect(vehicles).toHaveLength(1);
      expect(vehicles[0].id).toBe('14');
    });

    it('debe devolver un array vacío cuando no se proporcionan URLs', async () => {
      const vehicles = await repository.getVehiculosByUrls([]);

      expect(vehicles).toEqual([]);
      expect(mockApiClient.getVehiculoByUrl).not.toHaveBeenCalled();
    });

    it('debe buscar los vehículos en paralelo', async () => {
      vi.mocked(mockApiClient.getVehiculoByUrl).mockResolvedValue(mockVehicleResponse);

      await repository.getVehiculosByUrls([
        'https://swapi.dev/api/vehicles/14/',
        'https://swapi.dev/api/vehicles/30/',
      ]);

      expect(mockApiClient.getVehiculoByUrl).toHaveBeenCalledTimes(2);
    });
  });
});
