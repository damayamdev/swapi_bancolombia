import { usePersonajeConVehiculos } from '@/application/hooks/usePersonajeConVehículos';
import { ObtenerPersonajeConVehículosUseCase } from '@/core/useCases/ObtenerPersonajeConVehículos';
import { swapiClient } from '@/infrastructure/api/SwapiClient';
import { PersonajeRepository } from '@/infrastructure/repositories/PersonajeRepository';
import { VehiculoRepository } from '@/infrastructure/repositories/VehiculoRepository';
import React, { useMemo, useState } from 'react'
import { Loading } from '@presentation/components/Loading';
import { MensajeError } from '@/presentation/components/MensajeError';
import { PersonajeCard } from '@presentation/components/PersonajeCard';
import { VehiculoLista } from '../components/VehiculoLista';

export const PersonajePage = () => {


    const [buscarId, setBuscarId] = useState('');
    const [actualId, setActualId] = useState('');

    const useCase = useMemo(() => {
        const characterRepository = new PersonajeRepository(swapiClient);
        const vehicleRepository = new VehiculoRepository(swapiClient);
        return new ObtenerPersonajeConVehículosUseCase(characterRepository, vehicleRepository);
    }, []);

    const { data, loading, error, refetch } = usePersonajeConVehiculos(actualId, useCase);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setActualId(buscarId.trim());
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setBuscarId(value);

        if (!value.trim()) {
            setActualId('');
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
            
                <div className="mb-8">
                    <form onSubmit={handleSearch} className="max-w-md mx-auto">
                        <div className="flex gap-2">
                            <input
                                type="number"
                                min="1"
                                value={buscarId}
                                onChange={handleInputChange}
                                placeholder="Ingrese el ID (1)"
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none bg-white shadow-sm"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={loading || !buscarId.trim()}
                                className="px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                            >
                                Buscar
                            </button>
                        </div>
                    </form>
                </div>

                <main>
                    {loading && <Loading message="Cargando datos del personaje..." />}

                    {error && <MensajeError error={error} onRetry={refetch} />}

                    {!loading && !error && !data && actualId === '' && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                Introduzca un ID de personaje para buscar
                            </p>
                        </div>
                    )}

                    {data && (
                        <div className="space-y-8">
                            <PersonajeCard personaje={data.personaje} />
                            <VehiculoLista vehiculo={data.vehiculos} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
