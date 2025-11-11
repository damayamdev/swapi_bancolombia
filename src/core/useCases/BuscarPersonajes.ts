import type { Personaje } from '../entities/Personaje';
import type { IPersonajeRepository } from '../repositories/IPersonajeRepository';

export class BuscarPersonajesUseCase {
  private readonly personajeRepository: IPersonajeRepository;

  constructor(personajeRepository: IPersonajeRepository) {
    this.personajeRepository = personajeRepository;
  }

  async execute(searchTerm: string): Promise<Personaje[]> {
 
    if (!searchTerm || searchTerm.trim().length === 0) {
      throw new Error('El item de búsqueda es obligatorio');
    }

    if (searchTerm.trim().length < 2) {
      throw new Error('El item de búsqueda debe tener al menos 2 caracteres');
    }

    return await this.personajeRepository.buscarPersonajeByName(searchTerm.trim());
  }
}
