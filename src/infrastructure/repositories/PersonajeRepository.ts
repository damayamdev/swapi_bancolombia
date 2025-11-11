import type { Personaje } from '@core/entities/Personaje';
import type { IPersonajeRepository } from '@core/repositories/IPersonajeRepository';
import { SwapiClient } from '../api/SwapiClient';
import { PersonajeMapper } from '../mappers/PersonajeMapper';
import { NotFoundError } from '../api/types';


export class PersonajeRepository implements IPersonajeRepository {
  private readonly apiClient: SwapiClient;

  constructor(apiClient: SwapiClient) {
    this.apiClient = apiClient;
  }

  async getPersonajeById(id: string): Promise<Personaje | null> {
    try {
      const response = await this.apiClient.getPersonaje(id);
      return PersonajeMapper.toDomain(response);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return null;
      }
      throw error;
    }
  }

  async buscarPersonajeByName(name: string): Promise<Personaje[]> {
    const response = await this.apiClient.buscarPersonajes(name);
    return PersonajeMapper.toDomainList(response.results);
  }
}
