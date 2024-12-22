import { dirname } from 'path';
import prompts from 'prompts';
import { fileURLToPath } from 'url';
import { copyFiles, exec, log, removeFiles } from './utils.js';

const SCRIPT_PATH = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = `${SCRIPT_PATH}/../templates/react`;

const cfg = {
  dependencies: [
    '@connectrpc/connect',
    '@connectrpc/connect-web',
    '@phosphor-icons/react',
    'react-router',
    '@nanostores/react',
    '@nanostores/persistent',
    '@nextui-org/react',
    'framer-motion', // @nextui-org/react dependency
    'nprogress',
    '@fontsource-variable/inter',
  ],
  devDependencies: [
    'prettier',
    'prettier-plugin-tailwindcss',
    'tailwindcss',
    'postcss',
    'autoprefixer',
    'husky',
    'lint-staged',
  ],
  remove: ['src/assets/react.svg', 'src/App.css'],
  husky: [
    `npx husky init`,
    `npm pkg set lint-staged='{"*.{js,jsx,ts,tsx}": ["npx eslint --quiet --fix"],"*.{json,js,ts,jsx,tsx,html}": ["prettier --write --ignore-unknown"]}' --json`,
  ],
  git: [
    'git checkout -b development',
    'git add .',
    'git commit -m "feat: initial commit"',
  ],
};

export async function reactJsTemplate() {
  const { choice: name } = await prompts({
    name: 'choice',
    type: 'text',
    message: 'Enter project name',
  });
  const PROJECT_PATH = `${process.cwd()}/${name}`;
  const execInside = cmd => exec(cmd, PROJECT_PATH);

  log(`\nInitializing Vite project: ${name}`);
  await exec(`npm create vite@latest ${name} -- --template react`);
  await execInside('git init');

  log(`\nRemoving unnecessary files`);
  await removeFiles(PROJECT_PATH, cfg.remove);

  log(`\nInstalling husky + lint-staged hook`);
  for (const husky of cfg.husky) {
    await execInside(husky);
  }

  log(`\nInstalling dependencies`);
  await execInside(`npm i -D ${cfg.devDependencies.join(' ')}`);

  log(`\nInstalling dev dependencies`);
  await execInside(`npm i ${cfg.dependencies.join(' ')}`);

  log(`\nCopying template files`);
  await copyFiles(TEMPLATE_PATH, PROJECT_PATH);

  log(`\nCommitting changes`);
  for (const git of cfg.git) {
    await execInside(git);
  }
}
