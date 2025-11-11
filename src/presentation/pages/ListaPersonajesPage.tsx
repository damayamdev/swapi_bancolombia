import { usePersonajeLista } from '@/application/hooks/usePersonajeLista';
import type { Personaje } from '@/core/entities/Personaje';
import { useEffect, useRef, useState } from 'react';
import { MensajeError } from '../components/MensajeError';
import { PersonajeCardList } from '../components/PersonajeCardList';
import { Loading } from '../components/Loading';
import PersonajeModal from '../components/PersonajeModal';
import { ObtenerPersonajeConVehículosUseCase } from '@/core/useCases/ObtenerPersonajeConVehículos';
import { PersonajeRepository } from '@/infrastructure/repositories/PersonajeRepository';
import { VehiculoRepository } from '@/infrastructure/repositories/VehiculoRepository';
import { SwapiClient } from '@/infrastructure/api/SwapiClient';

export const ListaPersonajesPage = () => {
  const { personajes, loading, error, hasMore, loadMore } = usePersonajeLista();
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState<Personaje | null>(null);
  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleViewDetails = async (personaje: Personaje) => {
 
    setPersonajeSeleccionado(personaje);
    setLoadingVehicles(true);
    
    try {
      const apiClient = new SwapiClient();
      const personajeRepo = new PersonajeRepository(apiClient);
      const vehiculoRepo = new VehiculoRepository(apiClient);
      const useCase = new ObtenerPersonajeConVehículosUseCase(personajeRepo, vehiculoRepo);

      const result = await useCase.execute(personaje.id);
      
      if (result) {
        setPersonajeSeleccionado({
          ...result.personaje,
          vehicles: result.vehiculos,
        });
      }
    } catch (err) {
      console.error('Error loading vehicles:', err);
    } finally {
      setLoadingVehicles(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadMore]);

  return (
    <>
      <main className="max-w-400 mx-auto px-8 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-8">
            <MensajeError error={error} onRetry={loadMore} />
          </div>
        )}

        {personajes.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 mb-8"
            data-testid="characters-grid"
          >
            {personajes.map((personaje) => (
              <PersonajeCardList
                key={personaje.id}
                personaje={personaje}
                onViewDetails={() => handleViewDetails(personaje)}
              />
            ))}
          </div>
        )}

        {loading && (
          <div className="py-8">
            <Loading message="Cargando más personajes..." />
          </div>
        )}

        {hasMore && !loading && (
          <div ref={observerTarget} className="h-20 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Desplácese para cargar más...</div>
          </div>
        )}

        {!hasMore && personajes.length > 0 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
              <span className="text-2xl">🎉</span>
              <p className="text-gray-700 font-medium">¡Ya has visto a todos los personajes!</p>
            </div>
          </div>
        )}

        {!loading && personajes.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se han encontrado personajes.
            </h3>
            <p className="text-gray-600">Intenta actualizar la página</p>
          </div>
        )}
      </main>

      {personajeSeleccionado && (
        <PersonajeModal
          personaje={personajeSeleccionado}
          onClose={() => setPersonajeSeleccionado(null)}
          loadingVehicles={loadingVehicles}
        />
      )}
    </>
  );
};
