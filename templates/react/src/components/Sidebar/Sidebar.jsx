import Logo from '@/assets/icons/Logo';
import { ButtonLink } from '@/components/NextUi/Button';
import { useMatch, useResolvedPath } from 'react-router';

function NavLink({ to, label }) {
  const path = useResolvedPath(to);
  const match = useMatch(path.pathname);

  return (
    <ButtonLink
      radius="none"
      variant="flat"
      to={to}
      color={match ? 'primary' : 'default'}
    >
      {label}
    </ButtonLink>
  );
}

export default function Sidebar() {
  return (
    <div className="grid content-start gap-2 overflow-auto bg-content2 px-2 py-y">
      <Logo className="size-5" />
      <NavLink to="/dashboard" label="Dashboard" />
      <NavLink to="/playground" label="Playground" />
      <NavLink to="/logout" label="Logout" />
    </div>
  );
}
