import { ButtonLink } from '@/components/NextUi/Button';
import nProgress from 'nprogress';
import { useRouteError } from 'react-router';

export default function LoaderErrorBoundary() {
  const error = useRouteError();
  if (error) nProgress.done();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-bold title-24">Oops! Something went wrong...</h1>
      <p>{error.statusText || error.message}</p>
      {error.status && <p className="text-muted">Error Code: {error.status}</p>}
      <ButtonLink>Back to dashboard</ButtonLink>
    </div>
  );
}
