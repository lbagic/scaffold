import { redirect } from 'react-router';

const REDIRECT_FALLBACK = '/';

/** @param { import("react-router").LoaderFunctionArgs } */
export default async function redirectLoader({ params, request }) {
  const redirectType = params.redirectType;
  const searchParams = new URL(request.url).searchParams;

  try {
    if (redirectType === 'google') {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      // TODO - call backend - do what must be done, redirect after
      // TODO - change to a page with some nice loading e.g. "Your request is being processed"
      return redirect(`/projects/${state}?google-code=${code}`);
    }
  } catch (err) {
    console.error('redirect error', err);
    return redirect(REDIRECT_FALLBACK);
  }
  return redirect(REDIRECT_FALLBACK);
}
