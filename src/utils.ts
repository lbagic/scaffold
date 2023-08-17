import { spawn } from "child_process";
import prompts from "prompts";

type Prompt = prompts.PromptObject<"choice">;
type ChoicePrompt = Required<Pick<Prompt, "message" | "choices">>;

export async function command(cmd: string) {
  const commandList = cmd.split(";").map((cmd) => cmd.trim());
  for (const command of commandList) {
    await new Promise((resolve) =>
      spawn(command, { shell: true, stdio: "inherit" }).on("exit", resolve)
    );
  }
}
export function commandChoice(title: string, cmd: string) {
  return { title, description: cmd, value: () => command(cmd) };
}
export function choice(choice: prompts.Choice) {
  return choice;
}

export function prompt(prompt: ChoicePrompt): Prompt {
  return { name: "choice", type: "select", ...prompt };
}

export async function run(prompt: Prompt) {
  const { choice } = await prompts(prompt);
  if (typeof choice === "object") run(choice);
  else if (typeof choice === "function") choice();
}
