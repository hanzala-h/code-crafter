import * as vscode from "vscode";
import { info, error, progress } from "../utils/messageUtils";
import { exec } from "child_process";
import {
  getAppName,
  getProjectRoot,
  getViteTemplateName,
  getViteVariant,
  getViteCommand,
} from "../utils/projectUtils";
import { createOutputChannel, output } from "../utils/inputUtils";

const outputChannel = createOutputChannel("Vite App Creation");

async function viteApp(appName: string, projectRoot: string, command: string) {
  await progress(
    `Creating React application "${appName}"`,
    () =>
      new Promise<void>((resolve, reject) => {
        exec(command, { cwd: projectRoot }, (err, stdout, stderr) => {
          if (err) {
            error(`Error creating Vite application: ${stderr}`);
            reject(err);
          } else {
            const msg = `Vite application "${appName}" created successfully.`;
            info(msg);
            output(outputChannel, "Success", msg, stdout);
            resolve();
          }
        });
      })
  );
}

/**
 * Registers a VSCode command to create a Vite project.
 * @returns vscode.Disposable
 */
export default function vite(): vscode.Disposable {
  const disposable = vscode.commands.registerCommand(
    "code-crafter.vite",
    async () => {
      const appName = await getAppName("Vite", "vite-project");

      const projectRoot = await getProjectRoot("Vite");

      const template = await getViteTemplateName(
        "Enter the template name (react, vue, etc.,)"
      );

      const varient = await getViteVariant();

      const command = getViteCommand(appName, template, varient);

      info("Started building vite project");

      await viteApp(appName, projectRoot, command);
    }
  );

  return disposable;
}
