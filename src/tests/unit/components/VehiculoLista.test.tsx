import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VehiculoLista } from '@presentation/components/VehiculoLista';
import type { Vehiculo } from '@core/entities/Vehiculo';

describe('VehiculoLista', () => {
  const mockVehicles: Vehiculo[] = [
    {
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
    },
    {
      id: '30',
      name: 'Imperial Speeder Bike',
      model: '74-Z speeder bike',
      manufacturer: 'Aratech Repulsor Company',
      costInCredits: '8000',
      length: '3',
      maxAtmospheringSpeed: '360',
      crew: '1',
      passengers: '1',
      cargoCapacity: '4',
      vehicleClass: 'speeder',
    },
  ];

  it('debería mostrar la lista de vehículos', () => {
    render(<VehiculoLista vehiculo={mockVehicles} />);

    expect(screen.getByTestId('vehicle-list')).toBeInTheDocument();
    expect(screen.getByText('Snowspeeder')).toBeInTheDocument();
    expect(screen.getByText('Imperial Speeder Bike')).toBeInTheDocument();
  });

  it('debería renderizar un mensaje vacío cuando no hay vehículos', () => {
    render(<VehiculoLista vehiculo={[]} />);

    expect(screen.getByTestId('no-vehicles')).toBeInTheDocument();
    expect(screen.getByText('No hay vehiculos disponibles')).toBeInTheDocument();
  });

  it('debería mostrar los detalles del vehículo', () => {
    render(<VehiculoLista vehiculo={mockVehicles} />);

    expect(screen.getByTestId('vehicle-14')).toBeInTheDocument();
    expect(screen.getByText(/t-47 airspeeder/)).toBeInTheDocument();
    expect(screen.getByText(/Incom corporation/)).toBeInTheDocument();
  });
});
