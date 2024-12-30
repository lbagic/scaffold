#!/usr/bin/env node
import prompts from 'prompts';
import { reactJsTemplate } from './template-react-js.js';
import { exec } from './utils.js';

const cfg = {
  name: 'choice',
  type: 'select',
  message: 'What would you like to scaffold today?',
  choices: [
    {
      title: 'ReactJs - initialize project',
      description: 'custom project template',
      value: reactJsTemplate,
    },
    {
      title: 'Vite - initialize project',
      description: 'npm create vite@latest',
      value: () => exec('npm create vite@latest'),
    },
    {
      title: 'Astro (multiple options)',
      value: {
        name: 'choice',
        type: 'select',
        message: 'Astro options:',
        choices: [
          {
            title: 'Astro - initialize project',
            description: 'npm create astro@latest',
            value: () => exec('npm create astro@latest'),
          },
          {
            title: 'Tailwind - add to Astro project',
            description: 'npx astro add tailwind',
            value: () => exec('npx astro add tailwind'),
          },
        ],
      },
    },
    {
      title: 'Eslint - add to project',
      description: 'npm init @eslint/config',
      value: () => exec('npm init @eslint/config'),
    },
    {
      title: 'NestJS - initialize project',
      description: 'npm i -g @nestjs/cli; nest new',
      value: async () => {
        await exec('npm i -g @nestjs/cli');
        await exec('nest new');
      },
    },
    {
      title: 'Next - initialize project',
      description: 'npx create-next-app@latest',
      value: () => exec('npx create-next-app@latest'),
    },
    {
      title: 'OpenWebComponent - initialize project',
      description: 'npm init @open-wc',
      value: () => exec('npm init @open-wc'),
    },
  ],
};

async function runPrompts(promptConfig) {
  const res = await prompts(promptConfig);
  if (typeof res.choice === 'object') runPrompts(res.choice);
  else if (typeof res.choice === 'function') res.choice();
}

runPrompts(cfg);
