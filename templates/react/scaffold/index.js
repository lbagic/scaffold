import { camelCase, pascalCase } from 'change-case';
import { access, mkdir, readFile, writeFile } from 'fs/promises';
import hb from 'handlebars';
import { dirname } from 'path';
import prompts from 'prompts';

const msg = {
  ok: message => `\x1b[92m${message}\x1b[0m`,
  err: message => `\x1b[91m${message}\x1b[0m`,
  warn: message => `\x1b[93m${message}\x1b[0m`,
};

// Register helpers for Handlebars
hb.registerHelper('pascalCase', pascalCase);
hb.registerHelper('camelCase', camelCase);

const cfg = {
  page: {
    templatePath: './scaffold/templates/page.hbs',
    resolvePath: name => `./src/pages/${name}/${name}.jsx`,
  },
  loader: {
    templatePath: './scaffold/templates/loader.hbs',
    resolvePath: name => `./src/pages/${name}/${camelCase(name)}Loader.js`,
  },
  component: {
    templatePath: './scaffold/templates/component.hbs',
    resolvePath: name => `./src/components/${name}/${name}.jsx`,
  },
};

async function scaffold(
  opts = { page: false, loader: false, component: false, name: '' }
) {
  opts.name = pascalCase(opts.name);
  const Name = opts.name;
  const cName = camelCase(opts.name);

  const files = await Promise.all(
    Object.entries(cfg)
      .filter(([key]) => opts[key])
      .map(async ([element, config]) => {
        const isScaffolding = opts[element];
        if (!isScaffolding) return null; // Return null if scaffolding is not enabled for this element
        const fullPath = config.resolvePath(Name);
        const fileExists = await access(fullPath)
          .then(() => true)
          .catch(() => false);

        if (fileExists)
          console.log(`${msg.err('File already exists:')} ${fullPath}`);

        async function generateFile() {
          const templateFile = await readFile(config.templatePath, 'utf8');
          const template = hb.compile(templateFile);
          await mkdir(dirname(fullPath), { recursive: true });
          await writeFile(fullPath, template(opts));
          console.log(`${msg.ok('Generated:')} ${fullPath}`);
        }

        return { fullPath, exists: fileExists, generate: generateFile };
      })
  );

  if (files.some(file => file.exists))
    throw new Error('File(s) already exists.');

  await Promise.all(files.map(file => file.generate()));

  if (opts.page) {
    const route = opts.loader
      ? `<Route path="TODO" element={<${Name} />} loader={guard(${cName}Loader, { type: 'user-only' })}></Route>`
      : `<Route path="TODO" element={<${Name} />}></Route>`;

    console.log(msg.ok('\nCopy route definition to ./src/router/router.jsx:'));
    console.log(msg.warn(route));
  }
}

async function main() {
  const { opts } = await prompts({
    type: 'select',
    name: 'opts',
    message: 'What do you want to generate?',
    choices: [
      { title: 'Page', value: { page: true } },
      { title: 'Component', value: { component: true } },
      { title: 'Loader', value: { loader: true } },
    ],
  });
  if (!opts) throw new Error('Operation cancelled.');

  if (opts.page) {
    const { loader } = await prompts({
      type: 'confirm',
      name: 'loader',
      message: 'Do you want to generate a loader?',
      initial: true,
    });
    if (loader) opts.loader = true;
  }

  const { name } = await prompts({
    type: 'text',
    name: 'name',
    message: `Enter the name:`,
    validate: value => (value ? true : 'Name is required.'),
  });
  if (!name) throw new Error('Operation cancelled.');
  opts.name = name;

  await scaffold({ ...opts, name });
}

try {
  main();
} catch (err) {
  console.error(`${msg.err(`Scaffolding failed`)}: ${err.message}`);
}
