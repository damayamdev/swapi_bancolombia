import type { Vehiculo } from './Vehiculo';

export interface Personaje {
  id: string;
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  vehicleUrls: string[];
  vehicles?: Vehiculo[];
}

export const crearPersonaje = (data: Partial<Personaje>): Personaje => {
  if (!data.name || data.name.trim().length === 0) {
    throw new Error('El nombre del personaje es obligatorio');
  }

  return {
    id: data.id || '',
    name: data.name,
    height: data.height || 'unknown',
    mass: data.mass || 'unknown',
    hairColor: data.hairColor || 'unknown',
    skinColor: data.skinColor || 'unknown',
    eyeColor: data.eyeColor || 'unknown',
    birthYear: data.birthYear || 'unknown',
    gender: data.gender || 'unknown',
    vehicleUrls: data.vehicleUrls || [],
    vehicles: data.vehicles || [],
  };
};
