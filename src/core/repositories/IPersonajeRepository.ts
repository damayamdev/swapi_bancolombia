import type { Personaje } from "../entities/Personaje";

export interface IPersonajeRepository {
  getPersonajeById(id: string): Promise<Personaje | null>;
  searchPersonajesByName(name: string): Promise<Personaje[]>;
}