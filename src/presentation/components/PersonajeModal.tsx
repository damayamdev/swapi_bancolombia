import type { Personaje } from '@/core/entities/Personaje';
import React, { useEffect } from 'react';

interface PersonajeModalProps {
  personaje: Personaje;
  onClose: () => void;
  loadingVehicles?: boolean;
}

const PersonajeModal = ({
  personaje,
  onClose,
  loadingVehicles = false,
}: PersonajeModalProps): React.ReactElement => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
      data-testid="modal-overlay"
    >
      <div
        className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-content"
      >
        <div className="sticky top-0 bg-linear-to-br from-purple-100 via-blue-50 to-teal-50 text-gray-900 px-6 py-6 rounded-t-2xl flex justify-between items-center border-b border-gray-200">
          <h2 className="text-2xl font-bold" data-testid="modal-character-name">
            {personaje.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/60 rounded-full transition-colors"
            aria-label="Close modal"
            data-testid="modal-close-button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-400 rounded"></span>
              Características físicas
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <DetalleItem label="Altura" value={`${personaje.height} cm`} icon="📏" />
              <DetalleItem label="Peso" value={`${personaje.mass} kg`} icon="⚖️" />
              <DetalleItem label="Color de Cabello" value={personaje.hairColor} icon="💇" />
              <DetalleItem label="Skin Color" value={personaje.skinColor} icon="🎨" />
              <DetalleItem label="Eye Color" value={personaje.eyeColor} icon="👁️" />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-400 rounded"></span>
              Información personal
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <DetalleItem label="Año de Nacimiento" value={personaje.birthYear} icon="🎂" />
              <DetalleItem label="Género" value={personaje.gender} icon="👤" />
            </div>
          </section>

          {personaje.vehicleUrls.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-teal-400 rounded"></span>
                Vehículos
              </h3>
              {loadingVehicles ? (
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-8 flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-3"></div>
                  <p className="text-teal-700 font-medium">Cargando información de vehículos...</p>
                </div>
              ) : personaje.vehicles && personaje.vehicles.length > 0 ? (
                <div className="space-y-3">
                  {personaje.vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="bg-teal-50 border border-teal-100 rounded-lg p-4"
                    >
                      <h4 className="font-bold text-teal-900 text-lg mb-3">{vehicle.name}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <VehicleDetail label="Modelo" value={vehicle.model} />
                        <VehicleDetail label="Fabricante" value={vehicle.manufacturer} />
                        <VehicleDetail label="Clase" value={vehicle.vehicleClass} />
                        <VehicleDetail label="Costo" value={vehicle.costInCredits} />
                        <VehicleDetail label="Longitud" value={`${vehicle.length} m`} />
                        <VehicleDetail
                          label="Velocidad Máxima"
                          value={`${vehicle.maxAtmospheringSpeed} km/h`}
                        />
                        <VehicleDetail label="Tripulación" value={vehicle.crew} />
                        <VehicleDetail label="Pasajeros" value={vehicle.passengers} />
                        <VehicleDetail
                          label="Capacidad de Carga"
                          value={`${vehicle.cargoCapacity} kg`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                  <p className="text-teal-900 font-medium">
                    {personaje.vehicleUrls.length} vehículo
                    {personaje.vehicleUrls.length !== 1 ? 's' : ''} registrado
                    {personaje.vehicleUrls.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </section>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-medium rounded-full transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface DetalleItemProps {
  label: string;
  value: string;
  icon: string;
}

const DetalleItem = ({ label, value, icon }: DetalleItemProps): React.ReactElement => (
  <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 hover:bg-gray-100 hover:border-gray-200 transition-colors">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xl">{icon}</span>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
    </div>
    <p className="text-base font-semibold text-gray-900 capitalize">{value}</p>
  </div>
);

interface VehicleDetailProps {
  label: string;
  value: string;
}

const VehicleDetail = ({ label, value }: VehicleDetailProps): React.ReactElement => (
  <div className="bg-white/60 rounded-lg p-2">
    <p className="text-xs font-medium text-teal-700 uppercase tracking-wider mb-0.5">{label}</p>
    <p className="text-sm font-semibold text-teal-900 capitalize">{value}</p>
  </div>
);

export default PersonajeModal;
