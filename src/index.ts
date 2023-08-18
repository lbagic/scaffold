#!/usr/bin/env node
import { commandChoice, prompt, run } from "./utils";

const main = prompt({
  message: "What would you like to scaffold today?",
  choices: [
    commandChoice("Vite", "npm create vite@latest"),
    commandChoice("Next", "npx create-next-app@latest"),
    commandChoice("NestJS", "npm i -g @nestjs/cli; nest new"),
    commandChoice("Astro", "npm create astro@latest"),
    commandChoice("ESLint", "npm init @eslint/config"),
    commandChoice("Open Web Component", "npm init @open-wc"),
  ],
});

run(main);
