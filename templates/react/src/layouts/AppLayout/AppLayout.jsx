import Sidebar from '@/components/Sidebar/Sidebar';
import { Outlet } from 'react-router';

export default function AppLayout() {
  return (
    <div className="grid h-full grid-cols-[auto_1fr]">
      <Sidebar />
      <div className="h-full overflow-auto px-x py-y">
        <Outlet />
      </div>
    </div>
  );
}
