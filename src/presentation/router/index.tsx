import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '@presentation/layouts/DashboardLayout';
import { ListaPersonajesPage } from '@presentation/pages/ListaPersonajesPage';
import { PersonajePage } from '@presentation/pages/PersonajePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: '/',
        element: <ListaPersonajesPage />,
      },
      {
        path: 'personaje-id',
        element: <PersonajePage />,
      },
    ],
  },
]);
