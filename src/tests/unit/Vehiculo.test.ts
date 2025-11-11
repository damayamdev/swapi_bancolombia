import { describe, it, expect } from 'vitest';
import { crearVehiculo, type Vehiculo } from '@core/entities/Vehiculo';

describe('Vehiculo Entity', () => {
  describe('crearVehiculo', () => {
    it('debe crear un vehículo válido con todas las propiedades', () => {
      const vehiculoData: Partial<Vehiculo> = {
        id: '14',
        name: 'Snowspeeder',
        model: 't-47 airspeeder',
        manufacturer: 'Incom corporation',
        costInCredits: 'unknown',
        length: '4.5',
        maxAtmospheringSpeed: '650',
        crew: '2',
        passengers: '0',
        cargoCapacity: '10',
        vehicleClass: 'airspeeder',
      };

      const vehiculo = crearVehiculo(vehiculoData);

      expect(vehiculo).toEqual(vehiculoData);
      expect(vehiculo.name).toBe('Snowspeeder');
      expect(vehiculo.model).toBe('t-47 airspeeder');
    });

    it('debe lanzar un error cuando no se proporciona el nombre', () => {
      expect(() => crearVehiculo({})).toThrow('El nombre del vehículo es obligatorio');
    });

    it('debe lanzar un error cuando el nombre es una cadena vacía', () => {
      expect(() => crearVehiculo({ name: '   ' })).toThrow('El nombre del vehículo es obligatorio');
    });

    it('debe establecer valores predeterminados para propiedades opcionales', () => {
      const vehiculo = crearVehiculo({ name: 'Test Vehicle' });

      expect(vehiculo.name).toBe('Test Vehicle');
      expect(vehiculo.id).toBe('');
      expect(vehiculo.model).toBe('unknown');
      expect(vehiculo.manufacturer).toBe('unknown');
      expect(vehiculo.costInCredits).toBe('unknown');
      expect(vehiculo.length).toBe('unknown');
      expect(vehiculo.maxAtmospheringSpeed).toBe('unknown');
      expect(vehiculo.crew).toBe('unknown');
      expect(vehiculo.passengers).toBe('unknown');
      expect(vehiculo.cargoCapacity).toBe('unknown');
      expect(vehiculo.vehicleClass).toBe('unknown');
    });

    it('debe manejar datos parciales correctamente', () => {
      const vehiculo = crearVehiculo({
        name: 'X-wing',
        model: 'T-65 X-wing',
        manufacturer: 'Incom Corporation',
      });

      expect(vehiculo.name).toBe('X-wing');
      expect(vehiculo.model).toBe('T-65 X-wing');
      expect(vehiculo.manufacturer).toBe('Incom Corporation');
      expect(vehiculo.crew).toBe('unknown');
    });
  });
});
