import { Navigate, useLocation, Outlet } from 'react-router-dom';

function App() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default App;
