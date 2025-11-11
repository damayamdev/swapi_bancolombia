import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '@presentation/layouts/DashboardLayout';
import { ListaPersonajesPage } from '@presentation/pages/ListaPersonajesPage';

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
        element: <>nuevo</>,
      },
    ],
  },
]);
