import { crearVehiculo, type Vehiculo } from '@core/entities/Vehiculo';
import type { SwapiVehiculoResponse } from '../api/types';
    
export class VehiculoMapper {

  private static extractIdFromUrl(url: string): string {
    const match = url.match(/\/(\d+)\/$/);
    return match ? match[1] : '';
  }

  static toDomain(response: SwapiVehiculoResponse): Vehiculo {
    return crearVehiculo({
      id: this.extractIdFromUrl(response.url),
      name: response.name,
      model: response.model,
      manufacturer: response.manufacturer,
      costInCredits: response.cost_in_credits,
      length: response.length,
      maxAtmospheringSpeed: response.max_atmosphering_speed,
      crew: response.crew,
      passengers: response.passengers,
      cargoCapacity: response.cargo_capacity,
      vehicleClass: response.vehicle_class,
    });
  }

  static toDomainList(responses: SwapiVehiculoResponse[]): Vehiculo[] {
    return responses.map((response) => this.toDomain(response));
  }
}
