import type { Personaje } from "@/core/entities/Personaje";
import React, { useEffect } from "react";


interface PersonajeModalProps {
  personaje: Personaje;
  onClose: () => void;
}


const PersonajeModal = ({ personaje, onClose }: PersonajeModalProps): React.ReactElement => {

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      data-testid="modal-overlay"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-content"
      >
        <div className="sticky top-0 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-2xl font-bold" data-testid="modal-character-name">
            {personaje.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close modal"
            data-testid="modal-close-button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded"></span>
              Physical Characteristics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <DetalleItem label="Height" value={`${personaje.height} cm`} icon="📏" />
              <DetalleItem label="Mass" value={`${personaje.mass} kg`} icon="⚖️" />
              <DetalleItem label="Hair Color" value={personaje.hairColor} icon="💇" />
              <DetalleItem label="Skin Color" value={personaje.skinColor} icon="🎨" />
              <DetalleItem label="Eye Color" value={personaje.eyeColor} icon="👁️" />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-indigo-600 rounded"></span>
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <DetalleItem label="Birth Year" value={personaje.birthYear} icon="🎂" />
              <DetalleItem label="Gender" value={personaje.gender} icon="👤" />
            </div>
          </section>

          {personaje.vehicleUrls.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-600 rounded"></span>
                Vehicles
              </h3>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-purple-900 font-medium">
                  {personaje.vehicleUrls.length} vehicle{personaje.vehicleUrls.length !== 1 ? 's' : ''} registered
                </p>
              </div>
            </section>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

interface DetalleItemProps {
  label: string;
  value: string;
  icon: string;
}

const DetalleItem = ({ label, value, icon }: DetalleItemProps): React.ReactElement => (
  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xl">{icon}</span>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
    </div>
    <p className="text-base font-semibold text-gray-900 capitalize">{value}</p>
  </div>
);

export default PersonajeModal
