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
      className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
      data-testid="character-card"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="character-name">
        {personaje.name}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <InfoItem label="Height" value={personaje.height} unit="cm" />
        <InfoItem label="Mass" value={personaje.mass} unit="kg" />
        <InfoItem label="Hair Color" value={personaje.hairColor} />
        <InfoItem label="Skin Color" value={personaje.skinColor} />
        <InfoItem label="Eye Color" value={personaje.eyeColor} />
        <InfoItem label="Birth Year" value={personaje.birthYear} />
        <InfoItem label="Gender" value={personaje.gender} />
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, unit }: InfoItemProps): React.ReactElement => {
  const displayValue = value === 'unknown' ? 'Unknown' : value;
  const fullValue = unit && value !== 'unknown' ? `${value} ${unit}` : displayValue;

  return (
    <div className="py-2" data-testid={`info-${label.toLowerCase().replace(' ', '-')}`}>
      <span className="text-sm font-medium text-gray-500">{label}:</span>
      <span className="ml-2 text-base text-gray-900">{fullValue}</span>
    </div>
  );
};
