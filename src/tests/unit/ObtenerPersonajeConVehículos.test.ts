import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ObtenerPersonajeConVehículosUseCase } from '@core/useCases/ObtenerPersonajeConVehículos';
import type { IPersonajeRepository } from '@core/repositories/IPersonajeRepository';
import type { IVehiculoRepository } from '@core/repositories/IVehiculoRepository';
import type { Personaje } from '@core/entities/Personaje';
import type { Vehiculo } from '@core/entities/Vehiculo';


describe('ObtenerPersonajeConVehículosUseCase', () => {
  let personajeRepository: IPersonajeRepository;
  let vehiculoRepository: IVehiculoRepository;
  let useCase: ObtenerPersonajeConVehículosUseCase;

  beforeEach(() => {
    personajeRepository = {
      getPersonajeById: vi.fn(),
      searchPersonajesByName: vi.fn(),
    };

    vehiculoRepository = {
      getVehiculoByUrl: vi.fn(),
      getVehiculosByUrls: vi.fn(),
    };

    useCase = new ObtenerPersonajeConVehículosUseCase(personajeRepository, vehiculoRepository);
  });

  it('debe devolver el personaje con vehículos cuando el personaje existe', async () => {
    const mockPersonaje: Personaje = {
      id: '1',
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hairColor: 'blond',
      skinColor: 'fair',
      eyeColor: 'blue',
      birthYear: '19BBY',
      gender: 'male',
      vehicleUrls: ['https://swapi.dev/api/vehicles/14/'],
    };

    const mockVehiculo: Vehiculo = {
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

    vi.mocked(personajeRepository.getPersonajeById).mockResolvedValue(mockPersonaje);
    vi.mocked(vehiculoRepository.getVehiculosByUrls).mockResolvedValue([mockVehiculo]);

    const result = await useCase.execute('1');

    expect(result).not.toBeNull();
    expect(result?.personaje).toEqual(mockPersonaje);
    expect(result?.vehiculos).toHaveLength(1);
    expect(result?.vehiculos[0]).toEqual(mockVehiculo);
    expect(personajeRepository.getPersonajeById).toHaveBeenCalledWith('1');
    expect(vehiculoRepository.getVehiculosByUrls).toHaveBeenCalledWith(mockPersonaje.vehicleUrls);
  });

  it('debe devolver null cuando el personaje no existe', async () => {
    vi.mocked(personajeRepository.getPersonajeById).mockResolvedValue(null);

    const result = await useCase.execute('999');

    expect(result).toBeNull();
    expect(personajeRepository.getPersonajeById).toHaveBeenCalledWith('999');
    expect(vehiculoRepository.getVehiculosByUrls).not.toHaveBeenCalled();
  });

  it('debe devolver el personaje con un array de vehículos vacío cuando el personaje no tiene vehículos', async () => {
    const mockPersonaje: Personaje = {
      id: '2',
      name: 'C-3PO',
      height: '167',
      mass: '75',
      hairColor: 'n/a',
      skinColor: 'gold',
      eyeColor: 'yellow',
      birthYear: '112BBY',
      gender: 'n/a',
      vehicleUrls: [],
    };

    vi.mocked(personajeRepository.getPersonajeById).mockResolvedValue(mockPersonaje);

    const result = await useCase.execute('2');

    expect(result).not.toBeNull();
    expect(result?.personaje).toEqual(mockPersonaje);
    expect(result?.vehiculos).toEqual([]);
    expect(vehiculoRepository.getVehiculosByUrls).not.toHaveBeenCalled();
  });

  it('debe lanzar un error cuando el ID del personaje está vacío', async () => {
    await expect(useCase.execute('')).rejects.toThrow('El ID del personaje es obligatorio');
  });

  it('debe lanzar un error cuando el ID del personaje es solo espacios en blanco', async () => {
    await expect(useCase.execute('   ')).rejects.toThrow('El ID del personaje es obligatorio');
  });
});