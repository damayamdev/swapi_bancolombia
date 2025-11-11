import type { Personaje } from '../entities/Personaje';
import type { Vehiculo } from '../entities/Vehiculo';
import type { IPersonajeRepository } from '../repositories/IPersonajeRepository';
import type { IVehiculoRepository } from '../repositories/IVehiculoRepository';


export interface PersonajeConVehiculos {
  personaje: Personaje;
  vehiculos: Vehiculo[];
}

export class ObtenerPersonajeConVehículosUseCase {
  private readonly personajeRepository: IPersonajeRepository;
  private readonly vehiculoRepository: IVehiculoRepository;

  constructor(
    personajeRepository: IPersonajeRepository,
    vehiculoRepository: IVehiculoRepository
  ) {
    this.personajeRepository = personajeRepository;
    this.vehiculoRepository = vehiculoRepository;
  }

  async execute(PersonajeId: string): Promise<PersonajeConVehiculos | null> {
    if (!PersonajeId || PersonajeId.trim().length === 0) {
      throw new Error('El ID del personaje es obligatorio');
    }
    
    const personaje = await this.personajeRepository.getPersonajeById(PersonajeId);

    if (!personaje) {
      return null;
    }

    const vehiculos =
      personaje.vehicleUrls.length > 0
        ? await this.vehiculoRepository.getVehiculosByUrls(personaje.vehicleUrls)
        : [];

    return {
      personaje,
      vehiculos,
    };
  }
}
