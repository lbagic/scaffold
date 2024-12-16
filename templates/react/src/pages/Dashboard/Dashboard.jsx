import dashboardLoader from '@/pages/Dashboard/dashboardLoader';
import { useLoaderData } from 'react-router-dom';

export default function Dashboard() {
  const loader = useLoaderData(dashboardLoader);

  return (
    <div>
      <p>Dashboard</p>
      <pre>{JSON.stringify(loader, null, 2)}</pre>
    </div>
  );
}
