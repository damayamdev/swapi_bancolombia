export interface Vehiculo {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  costInCredits: string;
  length: string;
  maxAtmospheringSpeed: string;
  crew: string;
  passengers: string;
  cargoCapacity: string;
  vehicleClass: string;
}

export const crearVehiculo = (data: Partial<Vehiculo>): Vehiculo => {
  if (!data.name || data.name.trim().length === 0) {
    throw new Error('El nombre del vehículo es obligatorio');
  }

  return {
    id: data.id || '',
    name: data.name,
    model: data.model || 'unknown',
    manufacturer: data.manufacturer || 'unknown',
    costInCredits: data.costInCredits || 'unknown',
    length: data.length || 'unknown',
    maxAtmospheringSpeed: data.maxAtmospheringSpeed || 'unknown',
    crew: data.crew || 'unknown',
    passengers: data.passengers || 'unknown',
    cargoCapacity: data.cargoCapacity || 'unknown',
    vehicleClass: data.vehicleClass || 'unknown',
  };
};
