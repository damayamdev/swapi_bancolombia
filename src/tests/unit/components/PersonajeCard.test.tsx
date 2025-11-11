import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PersonajeCard } from '@presentation/components/PersonajeCard';
import type { Personaje } from '@core/entities/Personaje';

describe('CharacterCard', () => {
  const mockPersonaje: Personaje = {
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
  };

  it('debería mostrar correctamente la información de los personajes', () => {
    render(<PersonajeCard personaje={mockPersonaje} />);

    expect(screen.getByTestId('personaje-card')).toBeInTheDocument();
    expect(screen.getByTestId('personaje-name')).toHaveTextContent('Luke Skywalker');
    expect(screen.getByTestId('info-altura')).toBeInTheDocument();
    expect(screen.getByTestId('info-masa')).toBeInTheDocument();
  });

  it('debería mostrar la altura con la unidad', () => {
    render(<PersonajeCard personaje={mockPersonaje} />);

    const heightElement = screen.getByTestId('info-altura');
    expect(heightElement).toHaveTextContent('Altura');
    expect(heightElement).toHaveTextContent('172');
    expect(heightElement).toHaveTextContent('cm');
  });

  it('debería mostrar la masa con la unidad', () => {
    render(<PersonajeCard personaje={mockPersonaje} />);

    const massElement = screen.getByTestId('info-masa');
    expect(massElement).toHaveTextContent('Masa');
    expect(massElement).toHaveTextContent('77');
    expect(massElement).toHaveTextContent('kg');
  });

  it('debería manejar valores desconocidos', () => {
    const personajeWithUnknowns: Personaje = {
      ...mockPersonaje,
      height: 'unknown',
      mass: 'unknown',
    };

    render(<PersonajeCard personaje={personajeWithUnknowns} />);

    expect(screen.getByTestId('info-altura')).toHaveTextContent('Unknown');
    expect(screen.getByTestId('info-masa')).toHaveTextContent('Unknown');
  });
});
