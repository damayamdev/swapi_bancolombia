import type { Vehiculo } from "@/core/entities/Vehiculo";



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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vehiculo</h3>
            <div className="grid gap-4 md:grid-cols-2">
                {vehiculo.map((vehiculoItem) => (
                    <VehiculoCard key={vehiculoItem.id} vehiculo={vehiculoItem} />
                ))}
            </div>
        </div>
    );
}


interface VehiculoCardProps {
    vehiculo: Vehiculo;
}

const VehiculoCard = ({ vehiculo }: VehiculoCardProps): React.ReactElement => {
    return (
        <div
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            data-testid={`vehicle-${vehiculo.id}`}
        >
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{vehiculo.name}</h4>
            <div className="space-y-1 text-sm">
                <VehiculoInfo label="Model" value={vehiculo.model} />
                <VehiculoInfo label="Manufacturer" value={vehiculo.manufacturer} />
                <VehiculoInfo label="Class" value={vehiculo.vehicleClass} />
                <VehiculoInfo label="Crew" value={vehiculo.crew} />
                <VehiculoInfo label="Passengers" value={vehiculo.passengers} />
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
        <p className="text-gray-700">
            <span className="font-medium">{label}:</span> {value}
        </p>
    );
};
