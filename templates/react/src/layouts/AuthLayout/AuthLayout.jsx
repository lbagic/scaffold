import Logo from '@/assets/icons/Logo';
import Card from '@/components/NextUi/Card';
import { CardBody, CardHeader } from '@nextui-org/react';
import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="grid h-full place-items-center">
      <Card className="w-full max-w-[500px] p-8">
        <CardHeader>
          <Logo height={48} width="100%" />
        </CardHeader>
        <CardBody>
          <Outlet />
        </CardBody>
      </Card>
    </div>
  );
}
