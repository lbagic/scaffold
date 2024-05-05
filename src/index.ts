#!/usr/bin/env node
import { choice, runPrompts, select } from "./utils";

const prompts = select({
  message: "What would you like to scaffold today?",
  choices: [
    {
      title: "Astro (multiple options)",
      value: select({
        message: "Astro options:",
        choices: [
          choice("Astro - scaffold project", "npm create astro@latest"),
          choice("Tailwind - add to Astro project", "npx astro add tailwind"),
        ],
      }),
    },
    choice("Eslint - add to project", "npm init @eslint/config"),
    choice("NestJS - scaffold project", "npm i -g @nestjs/cli; nest new"),
    choice("Next - scaffold project", "npx create-next-app@latest"),
    choice("OpenWebComponent - scaffold project", "npm init @open-wc"),
    choice("Vite - scaffold project", "npm create vite@latest"),
  ],
});

runPrompts(prompts);
