/** @param { import("react-router").LoaderFunctionArgs } */
export default async function dashboardLoader() {
  await new Promise(resolve => setTimeout(resolve, 2000)); // TODO - remove this
  const [data] = await Promise.all(['hello world']);

  return { data };
}
