import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from '@presentation/components/Loading';

describe('Loading', () => {
  it('debería mostrarse con el mensaje predeterminado', () => {
    render(<Loading />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('debería mostrarse con un mensaje personalizado', () => {
    render(<Loading message="Cargando datos del personaje..." />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Cargando datos del personaje...')).toBeInTheDocument();
  });
});