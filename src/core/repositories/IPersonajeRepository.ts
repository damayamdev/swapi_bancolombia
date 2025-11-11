import type { Personaje } from '../entities/Personaje';

export interface IPersonajeRepository {
  getPersonajeById(id: string): Promise<Personaje | null>;
  buscarPersonajeByName(name: string): Promise<Personaje[]>;
}
