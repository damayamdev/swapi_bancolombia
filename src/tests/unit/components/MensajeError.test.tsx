import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MensajeError } from '@presentation/components/MensajeError';

describe('MensajeError', () => {
  const mockError = new Error('Mensaje de error de prueba');

  it('debería mostrar un mensaje de error', () => {
    render(<MensajeError error={mockError} />);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Mensaje de error de prueba')).toBeInTheDocument();
  });

  it('debería renderizar el botón de reintento cuando se proporciona onRetry', () => {
    const onRetry = vi.fn();
    render(<MensajeError error={mockError} onRetry={onRetry} />);

    const retryButton = screen.getByTestId('retry-button');
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toHaveTextContent('Inténtalo de nuevo');
  });

  it('debería llamar a onRetry cuando se hace clic en el botón de reintento', () => {
    const onRetry = vi.fn();
    render(<MensajeError error={mockError} onRetry={onRetry} />);

    const retryButton = screen.getByTestId('retry-button');
    fireEvent.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('debería no renderizar el botón de reintento cuando no se proporciona onRetry', () => {
    render(<MensajeError error={mockError} />);

    expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument();
  });
});
