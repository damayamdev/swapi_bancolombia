import type { Personaje } from '@/core/entities/Personaje';

interface PersonajeCardListProps {
  personaje: Personaje;
  onViewDetails: () => void;
}

export const PersonajeCardList = ({
  personaje,
  onViewDetails,
}: PersonajeCardListProps): React.ReactElement => {
  return (
    <div
      className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200"
      data-testid="character-card-list"
    >
      <div className="absolute inset-0 bg-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      <div className="relative h-40 bg-linear-to-br from-purple-100 via-blue-50 to-teal-50 rounded-t-2xl overflow-hidden p-6">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
        </div>

        <div className="relative z-20 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-gray-700 text-2xl font-bold shadow-lg border-2 border-gray-200 transform group-hover:scale-105 transition-all duration-300">
              {personaje.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-6 pb-5 z-10">
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
            {personaje.name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-700">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              {personaje.gender}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-600">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Born {personaje.birthYear}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <StatCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            }
            label="Altura"
            value={`${personaje.height} cm`}
            color="blue"
          />
          <StatCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            }
            label="Masa"
            value={`${personaje.mass} kg`}
            color="indigo"
          />
          <StatCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
            }
            label="Vehículos"
            value={personaje.vehicleUrls.length.toString()}
            color="purple"
          />
        </div>

        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Características
          </p>
          <div className="flex flex-wrap gap-2">
            <Trait
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              value={personaje.hairColor}
              color="amber"
            />
            <Trait
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              value={personaje.eyeColor}
              color="sky"
            />
            <Trait
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              value={personaje.skinColor}
              color="rose"
            />
          </div>
        </div>

        <button
          onClick={onViewDetails}
          className="w-full py-3 bg-white border-2 border-gray-900 hover:bg-gray-900 text-gray-900 hover:text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2"
          data-testid="view-details-button"
        >
          <span>Ver detalles completos</span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'blue' | 'indigo' | 'purple';
}

const StatCard = ({ icon, label, value, color }: StatCardProps): React.ReactElement => {
  const colorClasses = {
    blue: 'bg-purple-50 text-purple-700 border-purple-100',
    indigo: 'bg-blue-50 text-blue-700 border-blue-100',
    purple: 'bg-teal-50 text-teal-700 border-teal-100',
  };

  return (
    <div
      className={`${colorClasses[color]} border rounded-xl p-3 text-center transition-all hover:shadow-sm hover:-translate-y-0.5 duration-300`}
    >
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-[10px] font-medium uppercase tracking-wide opacity-60 mb-1">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
};

interface TraitProps {
  icon: React.ReactNode;
  value: string;
  color: 'amber' | 'sky' | 'rose';
}

const Trait = ({ icon, value, color }: TraitProps): React.ReactElement => {
  const colorClasses = {
    amber: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    sky: 'bg-blue-50 text-blue-700 border-blue-200',
    rose: 'bg-pink-50 text-pink-700 border-pink-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 ${colorClasses[color]} border rounded-lg text-xs font-medium transition-all hover:scale-105 duration-200`}
    >
      {icon}
      <span className="capitalize">{value}</span>
    </span>
  );
};
