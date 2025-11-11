import { Header } from '@presentation/components/Header';
import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
