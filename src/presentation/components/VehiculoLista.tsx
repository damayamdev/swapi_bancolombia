import type { Vehiculo } from '@/core/entities/Vehiculo';

interface VehiculoListaProps {
  vehiculo: Vehiculo[];
}

export const VehiculoLista = ({ vehiculo }: VehiculoListaProps) => {
  if (vehiculo.length === 0) {
    return (
      <div className="text-center py-8" data-testid="no-vehicles">
        <p className="text-gray-500 italic">No hay vehiculos disponibles</p>
      </div>
    );
  }

  return (
    <div className="mt-8" data-testid="vehicle-list">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Vehiculos</h3>
        <div className="h-1 w-16 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 rounded-full"></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {vehiculo.map((vehiculoItem) => (
          <VehiculoCard key={vehiculoItem.id} vehiculo={vehiculoItem} />
        ))}
      </div>
    </div>
  );
};

interface VehiculoCardProps {
  vehiculo: Vehiculo;
}

const VehiculoCard = ({ vehiculo }: VehiculoCardProps): React.ReactElement => {
  return (
    <div
      className="bg-teal-50 rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
      data-testid={`vehicle-${vehiculo.id}`}
    >
      <h4 className="text-lg font-bold text-gray-900 mb-3">{vehiculo.name}</h4>
      <div className="space-y-2">
        <VehiculoInfo label="Modelo" value={vehiculo.model} />
        <VehiculoInfo label="Fabricante" value={vehiculo.manufacturer} />
        <VehiculoInfo label="Clase" value={vehiculo.vehicleClass} />
        <VehiculoInfo label="Tripulación" value={vehiculo.crew} />
        <VehiculoInfo label="Pasajeros" value={vehiculo.passengers} />
      </div>
    </div>
  );
};

interface VehiculoInfoProps {
  label: string;
  value: string;
}

const VehiculoInfo = ({ label, value }: VehiculoInfoProps): React.ReactElement => {
  return (
    <div className="flex items-center text-sm">
      <span className="font-medium text-gray-700 min-w-[100px]">{label}:</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
};
