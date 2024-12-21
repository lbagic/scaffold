/** @param { import("react-router").LoaderFunctionArgs } */
export default async function dashboardLoader() {
  const [data] = await Promise.all(['hello world']);

  return { data };
}
