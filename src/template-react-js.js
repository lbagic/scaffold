import { dirname } from 'path';
import prompts from 'prompts';
import { fileURLToPath } from 'url';
import { copyFiles, exec, msg, removeFiles } from './utils.js';

const SCRIPT_PATH = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = `${SCRIPT_PATH}/../templates/react`;

const cfg = {
  dependencies: [
    '@connectrpc/connect',
    '@connectrpc/connect-web',
    '@fontsource-variable/inter',
    '@nanostores/persistent',
    '@nanostores/react',
    '@nextui-org/react',
    '@phosphor-icons/react',
    'framer-motion', // @nextui-org/react dependency
    'nprogress',
    'react@latest', // react 19
    'react-dom@latest', // react 19
    'react-router',
  ],
  devDependencies: [
    '@types/react@latest', // react 19
    '@types/react-dom@latest', // react 19
    'autoprefixer',
    'husky',
    'lint-staged',
    'postcss',
    'prettier',
    'prettier-plugin-tailwindcss',
    'tailwindcss',
    'change-case', // scaffold dependency
    'handlebars', // scaffold dependency
    'prompts', // scaffold dependency
  ],
  remove: ['src/acssets/react.svg', 'src/App.css'],
};

export async function reactJsTemplate() {
  const { choice: name } = await prompts({
    name: 'choice',
    type: 'text',
    message: 'Enter project name',
  });
  const PROJECT_PATH = `${process.cwd()}/${name}`;
  const execInside = cmd => exec(cmd, PROJECT_PATH);

  const timeLog = `\n${msg.ok(`[SUCCESS] ReactJs - initialize project "${name}"`)}`;
  console.time(timeLog);

  console.log(msg.ok(`\nInitializing Vite project: ${name}`));
  await exec(`npm create vite@latest ${name} -- --template react`);
  await execInside('git init');

  console.log(msg.ok(`\nRemoving unnecessary files`));
  await removeFiles(PROJECT_PATH, cfg.remove);

  console.log(msg.ok(`\nInstalling husky + lint-staged hook`));
  await execInside('npx husky init');
  await execInside(
    `npm pkg set lint-staged='{"*.{js,jsx,ts,tsx}": ["npx eslint --quiet --fix"],"*.{json,js,ts,jsx,tsx,html}": ["prettier --write --ignore-unknown"]}' --json`
  );

  console.log(msg.ok(`\nAdding npm scripts`));
  const npmScripts = {
    scaffold: `node scaffold/index.js`,
    proto: `rm -rf ./gen && curl 'https://general.storage.codilas.link/${name}/proto/descriptor.bin' --output ./descriptor.bin && buf generate --include-imports descriptor.bin && rm ./descriptor.bin`,
    psproto: `rm ./gen -r; mkdir ./gen; curl -o descriptor.bin 'https://general.storage.codilas.link/${name}/proto/descriptor.bin'; buf generate --include-imports descriptor.bin; rm ./descriptor.bin`,
  };
  for (const key in npmScripts)
    await execInside(`npm pkg set scripts.${key}="${npmScripts[key]}"`);

  console.log(msg.ok(`\nInstalling dependencies`));
  await execInside(`npm i ${cfg.dependencies.join(' ')}`);

  console.log(msg.ok(`\nInstalling dev dependencies`));
  await execInside(`npm i -D ${cfg.devDependencies.join(' ')}`);

  console.log(msg.ok(`\nCopying template files`));
  await copyFiles(TEMPLATE_PATH, PROJECT_PATH);

  console.log(msg.ok(`\nCommitting changes`));
  await execInside(`git checkout -b development`);
  await execInside(`git add .`);
  await execInside(`git commit -m "feat: initial commit"`);

  console.timeEnd(timeLog);
}
