import type { Personaje } from "@/core/entities/Personaje";

interface PersonajeCardListProps {
    personaje: Personaje;
    onViewDetails: () => void;
}

export const PersonajeCardList = ({ personaje, onViewDetails }: PersonajeCardListProps): React.ReactElement => {
    return (
        <div
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            data-testid="character-card-list"
        >
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 h-2"></div>

            <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg">
                        {personaje.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors">
                            {personaje.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                                {personaje.gender}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                                Born {personaje.birthYear}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                    <QuickStat icon="📏" label="Height" value={`${personaje.height} cm`} />
                    <QuickStat icon="⚖️" label="Mass" value={`${personaje.mass} kg`} />
                    <QuickStat icon="🚗" label="Vehicles" value={personaje.vehicleUrls.length.toString()} />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <Trait icon="💇" value={personaje.hairColor} />
                    <Trait icon="👁️" value={personaje.eyeColor} />
                    <Trait icon="🎨" value={personaje.skinColor} />
                </div>

                <button
                    onClick={onViewDetails}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 group"
                    data-testid="view-details-button"
                >
                    <span>View Details</span>
                    <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}


interface QuickStatProps {
    icon: string;
    label: string;
    value: string;
}

const QuickStat = ({ icon, label, value }: QuickStatProps): React.ReactElement => (
    <div className="bg-gray-50 rounded-lg p-2 text-center">
        <div className="text-lg mb-1">{icon}</div>
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
);

interface TraitProps {
    icon: string;
    value: string;
}

const Trait = ({ icon, value }: TraitProps): React.ReactElement => (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
        <span>{icon}</span>
        <span className="capitalize">{value}</span>
    </span>
);
