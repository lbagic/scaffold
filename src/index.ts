#!/usr/bin/env node
import { choice, runPrompts, select } from "./utils";

const prompts = select({
  message: "What would you like to scaffold today?",
  choices: [
    choice("Vite", "npm create vite@latest"),
    choice("Next", "npx create-next-app@latest"),
    choice("NestJS", "npm i -g @nestjs/cli; nest new"),
    choice("Astro", "npm create astro@latest"),
    choice("ESLint", "npm init @eslint/config"),
    choice("Open Web Component", "npm init @open-wc"),
  ],
});

runPrompts(prompts);
