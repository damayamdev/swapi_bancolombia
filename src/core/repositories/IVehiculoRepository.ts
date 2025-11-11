import type { Vehiculo } from '../entities/Vehiculo';

export interface IVehiculoRepository {
  getVehiculoByUrl(url: string): Promise<Vehiculo | null>;
  getVehiculosByUrls(urls: string[]): Promise<Vehiculo[]>;
}
