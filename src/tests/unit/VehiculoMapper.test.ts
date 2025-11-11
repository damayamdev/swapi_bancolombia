import { describe, it, expect } from 'vitest';
import { VehiculoMapper } from '@infrastructure/mappers/VehicularMapper';
import type { SwapiVehiculoResponse } from '@infrastructure/api/types';

describe('VehiculoMapper', () => {
  const mockApiResponse: SwapiVehiculoResponse = {
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

  describe('toDomain', () => {
    it('debe asignar correctamente la respuesta de la API al dominio de la entidad.', () => {
      const vehicle = VehiculoMapper.toDomain(mockApiResponse);

      expect(vehicle.id).toBe('14');
      expect(vehicle.name).toBe('Snowspeeder');
      expect(vehicle.model).toBe('t-47 airspeeder');
      expect(vehicle.manufacturer).toBe('Incom corporation');
      expect(vehicle.costInCredits).toBe('unknown');
      expect(vehicle.length).toBe('4.5');
      expect(vehicle.maxAtmospheringSpeed).toBe('650');
      expect(vehicle.crew).toBe('2');
      expect(vehicle.passengers).toBe('0');
      expect(vehicle.cargoCapacity).toBe('10');
      expect(vehicle.vehicleClass).toBe('airspeeder');
    });

    it('debe extraer el ID de la URL correctamente', () => {
      const vehicle = VehiculoMapper.toDomain(mockApiResponse);
      expect(vehicle.id).toBe('14');
    });

    it('debe manejar URLs sin barra diagonal al final', () => {
      const response = { ...mockApiResponse, url: 'https://swapi.dev/api/vehicles/30' };
      const vehicle = VehiculoMapper.toDomain(response);
      expect(vehicle.id).toBe('');
    });
  });

  describe('toDomainList', () => {
    it('debe mapear múltiples respuestas de la API a entidades de dominio', () => {
      const responses = [
        mockApiResponse,
        { ...mockApiResponse, url: 'https://swapi.dev/api/vehicles/30/' },
      ];
      const vehicles = VehiculoMapper.toDomainList(responses);

      expect(vehicles).toHaveLength(2);
      expect(vehicles[0].id).toBe('14');
      expect(vehicles[1].id).toBe('30');
    });

    it('debe manejar un array vacío', () => {
      const vehicles = VehiculoMapper.toDomainList([]);
      expect(vehicles).toEqual([]);
    });
  });
});
