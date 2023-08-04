#!/usr/bin/env node
import prompts from "prompts";
import { execute, choice } from "./utils";

const prompt = prompts({
  type: "select",
  name: "execute",
  message: "What would you like to scaffold today?",
  choices: [
    choice("Vite", "npm create vite@latest"),
    choice("Next", "npx create-next-app@latest"),
    choice("Nest", "npx @nestjs/cli@latest new"),
    choice("Astro", "npm create astro@latest"),
    choice("ESLint", "npm init @eslint/config"),
    choice("Open Web Component", "npm init @open-wc"),
  ],
});

execute(prompt);
