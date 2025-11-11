import { describe, it, expect } from 'vitest';
import { PersonajeMapper } from '@infrastructure/mappers/PersonajeMapper';
import type { SwapiPersonajeResponse } from '@infrastructure/api/types';

describe('PersonajeMapper', () => {
  const mockApiResponse: SwapiPersonajeResponse = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [],
    species: [],
    vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
    starships: [],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/',
  };

  describe('toDomain', () => {
    it('Debe asignar correctamente la respuesta de la API al dominio de la entidad.', () => {
      const personaje = PersonajeMapper.toDomain(mockApiResponse);

      expect(personaje.id).toBe('1');
      expect(personaje.name).toBe('Luke Skywalker');
      expect(personaje.height).toBe('172');
      expect(personaje.mass).toBe('77');
      expect(personaje.hairColor).toBe('blond');
      expect(personaje.skinColor).toBe('fair');
      expect(personaje.eyeColor).toBe('blue');
      expect(personaje.birthYear).toBe('19BBY');
      expect(personaje.gender).toBe('male');
      expect(personaje.vehicleUrls).toHaveLength(2);
    });

    it('Debe extraer correctamente el ID de la URL', () => {
      const personaje = PersonajeMapper.toDomain(mockApiResponse);
      expect(personaje.id).toBe('1');
    });

    it('Debe manejar URL sin barra inclinada al final', () => {
      const response = { ...mockApiResponse, url: 'https://swapi.dev/api/people/10' };
      const personaje = PersonajeMapper.toDomain(response);
      expect(personaje.id).toBe('10');
    });

    it('Debe manejar vehículos vacíos', () => {
      const response = { ...mockApiResponse, vehicles: [] };
      const personaje = PersonajeMapper.toDomain(response);
      expect(personaje.vehicleUrls).toEqual([]);
    });
  });

  describe('toDomainList', () => {
    it('Debe mapear múltiples respuestas de la API a entidades de dominio', () => {
      const responses = [
        mockApiResponse,
        { ...mockApiResponse, url: 'https://swapi.dev/api/people/2/' },
      ];
      const personajes = PersonajeMapper.toDomainList(responses);

      expect(personajes).toHaveLength(2);
      expect(personajes[0].id).toBe('1');
      expect(personajes[1].id).toBe('2');
    });

    it('Debe manejar un array vacío', () => {
      const personajes = PersonajeMapper.toDomainList([]);
      expect(personajes).toEqual([]);
    });
  });
});
