import { Link, Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="grid h-full grid-cols-[auto_1fr]">
      <div>
        <p>sidebar</p>
        <Link to="/logout">Logout</Link>
      </div>

      <div className="h-full overflow-auto px-32 py-24">
        <Outlet />
      </div>
    </div>
  );
}
