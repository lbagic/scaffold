import { spawn } from "child_process";
import prompts from "prompts";

type Prompt = prompts.PromptObject<"choice">;
type SelectPrompt = Required<Pick<Prompt, "message" | "choices">>;

export function select(prompt: SelectPrompt): Prompt {
  return { name: "choice", type: "select", ...prompt };
}

export function choice(title: string, cmd: string): prompts.Choice {
  return { title, description: cmd, value: () => executeCommand(cmd) };
}

export async function executeCommand(cmd: string) {
  const commandList = cmd.split(";").map((cmd) => cmd.trim());
  for (const command of commandList) {
    await new Promise((resolve) =>
      spawn(command, { shell: true, stdio: "inherit" }).on("exit", resolve)
    );
  }
}

export async function runPrompts(prompt: prompts.PromptObject<"choice">) {
  const { choice } = await prompts(prompt);
  if (typeof choice === "object") runPrompts(choice);
  else if (typeof choice === "function") choice();
}
