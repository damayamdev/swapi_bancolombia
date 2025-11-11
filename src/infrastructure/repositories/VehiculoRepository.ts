import type { Vehiculo } from '@core/entities/Vehiculo';
import type { IVehiculoRepository } from '@core/repositories/IVehiculoRepository';
import { SwapiClient } from '../api/SwapiClient';
import { VehiculoMapper } from '../mappers/VehicularMapper';
import { NotFoundError } from '../api/types';

export class VehiculoRepository implements IVehiculoRepository {
  private readonly apiClient: SwapiClient;

  constructor(apiClient: SwapiClient) {
    this.apiClient = apiClient;
  }

  async getVehiculoByUrl(url: string): Promise<Vehiculo | null> {
    try {
      const response = await this.apiClient.getVehiculoByUrl(url);
      return VehiculoMapper.toDomain(response);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return null;
      }
      throw error;
    }
  }

  async getVehiculosByUrls(urls: string[]): Promise<Vehiculo[]> {
    const vehiculoPromises = urls.map((url) => this.getVehiculoByUrl(url));
    const vehiculos = await Promise.all(vehiculoPromises);
    return vehiculos.filter((vehiculo): vehiculo is Vehiculo => vehiculo !== null);
  }
}
