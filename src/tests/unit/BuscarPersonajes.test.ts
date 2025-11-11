import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BuscarPersonajesUseCase } from '@core/useCases/BuscarPersonajes';
import type { IPersonajeRepository } from '@core/repositories/IPersonajeRepository';
import type { Personaje } from '@core/entities/Personaje';

describe('BuscarPersonajesUseCase', () => {
  let personajeRepository: IPersonajeRepository;
  let useCase: BuscarPersonajesUseCase;

  beforeEach(() => {
    personajeRepository = {
      getPersonajeById: vi.fn(),
      buscarPersonajeByName: vi.fn(),
    };

    useCase = new BuscarPersonajesUseCase(personajeRepository);
  });

  it('debe devolver los personajes que coincidan con el término de búsqueda', async () => {
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

    vi.mocked(personajeRepository.buscarPersonajeByName).mockResolvedValue(mockCharacters);

    const result = await useCase.execute('Luke');

    expect(result).toEqual(mockCharacters);
    expect(personajeRepository.buscarPersonajeByName).toHaveBeenCalledWith('Luke');
  });

  it('debe devolver un array vacío cuando no hay personajes que coincidan', async () => {
    vi.mocked(personajeRepository.buscarPersonajeByName).mockResolvedValue([]);

    const result = await useCase.execute('XYZ');

    expect(result).toEqual([]);
    expect(personajeRepository.buscarPersonajeByName).toHaveBeenCalledWith('XYZ');
  });

  it('debe eliminar los espacios en blanco del término de búsqueda antes de buscar', async () => {
    vi.mocked(personajeRepository.buscarPersonajeByName).mockResolvedValue([]);

    await useCase.execute('  Luke  ');

    expect(personajeRepository.buscarPersonajeByName).toHaveBeenCalledWith('Luke');
  });

  it('debe lanzar un error cuando el término de búsqueda está vacío', async () => {
    await expect(useCase.execute('')).rejects.toThrow('El item de búsqueda es obligatorio');
  });

  it('debe lanzar un error cuando el término de búsqueda está en blanco', async () => {
    await expect(useCase.execute('   ')).rejects.toThrow('El item de búsqueda es obligatorio');
  });

  it('debe lanzar un error cuando el término de búsqueda tiene menos de 2 caracteres', async () => {
    await expect(useCase.execute('a')).rejects.toThrow(
      'El item de búsqueda debe tener al menos 2 caracteres'
    );
  });
});
