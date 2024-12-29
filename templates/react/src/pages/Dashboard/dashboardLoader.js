/** @param { import("react-router").LoaderFunctionArgs } */
export default async function dashboardLoader() {
  const [data] = await Promise.all([
    new Promise(resolve => setTimeout(() => resolve('hello world'), 200)),
  ]);

  return { data };
}
