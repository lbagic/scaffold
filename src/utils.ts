import { spawn } from "child_process";
import prompts from "prompts";

function run(command: string) {
  const [cmd, ...args] = command.split(" ");
  cmd && spawn(cmd, args, { stdio: "inherit" });
}

export function choice(title: string, cli: string): prompts.Choice {
  return {
    title,
    value: () => run(cli),
    description: cli,
  };
}

export async function execute(prompts: Promise<prompts.Answers<"execute">>) {
  const { execute } = await prompts;
  execute?.();
}
