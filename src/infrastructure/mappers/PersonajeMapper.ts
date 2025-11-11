import { crearPersonaje, type Personaje } from '@core/entities/Personaje';
import type { SwapiPersonajeResponse } from '../api/types';

export class PersonajeMapper {
  private static extraerIdDeUrl(url: string | undefined): string {
    if (!url) return '';
    // Extrae el número al final de la URL, con o sin barra inclinada
    const match = url.match(/\/(\d+)(?:\/?$)/);
    return match ? match[1] : '';
  }

  static toDomain(response: SwapiPersonajeResponse): Personaje {
    try {
      return crearPersonaje({
        id: this.extraerIdDeUrl(response.url),
        name: response.name || 'Unknown',
        height: response.height || 'unknown',
        mass: response.mass || 'unknown',
        hairColor: response.hair_color || 'unknown',
        skinColor: response.skin_color || 'unknown',
        eyeColor: response.eye_color || 'unknown',
        birthYear: response.birth_year || 'unknown',
        gender: response.gender || 'unknown',
        vehicleUrls: response.vehicles || [],
      });
    } catch (error) {
      console.error('Error mapping personaje:', error, response);
      throw error;
    }
  }

  static toDomainList(responses: SwapiPersonajeResponse[]): Personaje[] {
    return responses.map((response) => this.toDomain(response));
  }
}
