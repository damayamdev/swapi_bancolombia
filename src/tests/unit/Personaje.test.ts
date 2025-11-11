import { describe, it, expect } from 'vitest';
import { crearPersonaje, type Personaje } from '@core/entities/Personaje';

describe('Personaje Entity', () => {
    describe('crear Personaje', () => {
        it('debería crear un personaje válido con todas las propiedades', () => {
            const personajeData: Partial<Personaje> = {
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
                vehicles: [{
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
                }]
            };

            const personaje = crearPersonaje(personajeData);

            expect(personaje).toEqual(personajeData);
            expect(personaje.name).toBe('Luke Skywalker');
            expect(personaje.vehicleUrls).toHaveLength(1);
        });

        it('debería lanzar un error cuando no se proporciona un nombre', () => {
            expect(() => crearPersonaje({})).toThrow('El nombre del personaje es obligatorio');
        });

        it('debería lanzar un error cuando el nombre es una cadena vacía', () => {
            expect(() => crearPersonaje({ name: '   ' })).toThrow('El nombre del personaje es obligatorio');
        });

        it('debería establecer valores predeterminados para las propiedades opcionales', () => {
            const personaje = crearPersonaje({ name: 'Test Character' });

            expect(personaje.name).toBe('Test Character');
            expect(personaje.id).toBe('');
            expect(personaje.height).toBe('unknown');
            expect(personaje.mass).toBe('unknown');
            expect(personaje.hairColor).toBe('unknown');
            expect(personaje.skinColor).toBe('unknown');
            expect(personaje.eyeColor).toBe('unknown');
            expect(personaje.birthYear).toBe('unknown');
            expect(personaje.gender).toBe('unknown');
            expect(personaje.vehicleUrls).toEqual([]);
        });

        it('debería manejar datos parciales correctamente', () => {
            const personaje = crearPersonaje({
                name: 'Darth Vader',
                height: '202',
                gender: 'male',
            });

            expect(personaje.name).toBe('Darth Vader');
            expect(personaje.height).toBe('202');
            expect(personaje.gender).toBe('male');
            expect(personaje.mass).toBe('unknown');
        });
    });
});
