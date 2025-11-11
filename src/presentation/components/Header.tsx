import { Link } from 'react-router-dom';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <svg className="h-14" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <text
              x="10"
              y="35"
              fontFamily="Arial, sans-serif"
              fontSize="24"
              fontWeight="bold"
              fill="#000"
            >
              SWAPI
            </text>
          </svg>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-lg">
          <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">
            Lista de Personajes
          </Link>
          <Link to="/personaje-id" className="text-gray-700 hover:text-gray-900 transition-colors">
            Buscar personaje x id
          </Link>
        </nav>
      </div>
    </header>
  );
};
