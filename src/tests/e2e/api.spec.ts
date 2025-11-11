import { test, expect } from '@playwright/test';

test.describe('SWAPI API Tests', () => {
  const BASE_URL = 'https://swapi.dev/api';

  test('debería obtener los datos de Luke Skywalker de la API', async ({ request }) => {
    const respuesta = await request.get(`${BASE_URL}/people/1/`);

    expect(respuesta.status()).toBe(200);

    const data = await respuesta.json();

    expect(data).toHaveProperty('name', 'Luke Skywalker');
    expect(data).toHaveProperty('height');
    expect(data).toHaveProperty('mass');
    expect(data).toHaveProperty('hair_color');
    expect(data).toHaveProperty('vehicles');
    expect(Array.isArray(data.vehicles)).toBe(true);
  });

  test('debería devolver 404 para personajes no existentes', async ({ request }) => {
    const respuesta = await request.get(`${BASE_URL}/people/9999/`);

    expect(respuesta.status()).toBe(404);
  });

  test('debería obtener los datos del vehículo de la API', async ({ request }) => {
    const respuesta = await request.get(`${BASE_URL}/people/1/`);
    const personajeData = await respuesta.json();

    if (personajeData.vehicles.length > 0) {
      const vehiculoUrl = personajeData.vehicles[0];
      const respuestaVehiculo = await request.get(vehiculoUrl);

      expect(respuestaVehiculo.status()).toBe(200);

      const vehiculoData = await respuestaVehiculo.json();

      expect(vehiculoData).toHaveProperty('name');
      expect(vehiculoData).toHaveProperty('model');
      expect(vehiculoData).toHaveProperty('manufacturer');
      expect(vehiculoData).toHaveProperty('vehicle_class');
    }
  });

  test('debería buscar personajes por nombre', async ({ request }) => {
    const respuesta = await request.get(`${BASE_URL}/people/?search=Skywalker`);

    expect(respuesta.status()).toBe(200);

    const data = await respuesta.json();

    expect(data).toHaveProperty('results');
    expect(Array.isArray(data.results)).toBe(true);
    expect(data.results.length).toBeGreaterThan(0);

    expect(data.results[0].name).toContain('Skywalker');
  });

  test('debería manejar la estructura de respuesta de la API correctamente', async ({ request }) => {
    const respuesta = await request.get(`${BASE_URL}/people/1/`);
    const data = await respuesta.json();

    const camposEsperados = [
      'name',
      'height',
      'mass',
      'hair_color',
      'skin_color',
      'eye_color',
      'birth_year',
      'gender',
      'homeworld',
      'films',
      'species',
      'vehicles',
      'starships',
      'created',
      'edited',
      'url',
    ];

    camposEsperados.forEach((campo) => {
      expect(data).toHaveProperty(campo);
    });
  });

  test('debería devolver una estructura de datos de vehículo válida', async ({ request }) => {
    const respuesta = await request.get(`${BASE_URL}/vehicles/14/`);

    expect(respuesta.status()).toBe(200);

    const data = await respuesta.json();

    const camposEsperados = [
      'name',
      'model',
      'manufacturer',
      'cost_in_credits',
      'length',
      'max_atmosphering_speed',
      'crew',
      'passengers',
      'cargo_capacity',
      'vehicle_class',
    ];

    camposEsperados.forEach((campo) => {
      expect(data).toHaveProperty(campo);
    });
  });

  
  test('Rendimiento de la API: el tiempo de respuesta debe ser razonable.', async ({ request }) => {
    const tiempoInicio = Date.now();
    const respuesta = await request.get(`${BASE_URL}/people/1/`);
    const tiempoFin = Date.now();

    const tiempoRespuesta = tiempoFin - tiempoInicio;

    expect(respuesta.status()).toBe(200);
    expect(tiempoRespuesta).toBeLessThan(3000);
  });
});
