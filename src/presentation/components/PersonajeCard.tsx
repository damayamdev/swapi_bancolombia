import type { Personaje } from '@/core/entities/Personaje';
import type React from 'react';

interface PersonajeCardProps {
  personaje: Personaje;
}

interface InfoItemProps {
  label: string;
  value: string;
  unit?: string;
}

export const PersonajeCard = ({ personaje }: PersonajeCardProps): React.ReactElement => {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 max-w-2xl mx-auto"
      data-testid="personaje-card"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="personaje-name">
          {personaje.name}
        </h2>
        <div className="h-1 w-20 bg-linear-to-r from-purple-400 via-blue-400 to-teal-400 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InfoItem label="Altura" value={personaje.height} unit="cm" />
        <InfoItem label="Masa" value={personaje.mass} unit="kg" />
        <InfoItem label="Color de Cabello" value={personaje.hairColor} />
        <InfoItem label="Color de Piel" value={personaje.skinColor} />
        <InfoItem label="Color de Ojos" value={personaje.eyeColor} />
        <InfoItem label="Año de Nacimiento" value={personaje.birthYear} />
        <InfoItem label="Género" value={personaje.gender} />
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, unit }: InfoItemProps): React.ReactElement => {
  const displayValue = value === 'unknown' ? 'Unknown' : value;

  return (
    <div className="bg-gray-50 p-3 rounded-xl hover:bg-purple-50 transition-colors duration-200" data-testid={`info-${label.toLowerCase().replace(' ', '-')}`}>
      <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
      <div className="text-base font-semibold text-gray-900">
        {displayValue}
        {unit && value !== 'unknown' && <span className="text-sm text-gray-600 ml-1">{unit}</span>}
      </div>
    </div>
  );
};
