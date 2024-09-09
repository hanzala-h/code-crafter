import * as vscode from "vscode";
import {
  getAppName,
  getProjectRoot,
  getViteTemplateName,
  getViteVariant,
  getViteCommand,
} from "../utils/projectUtils";
import { createProject } from "../utils/projectUtils";
import { info, error } from "../utils/messageUtils";

export default function vite(): vscode.Disposable {
  const disposable = vscode.commands.registerCommand(
    "code-crafter.vite",
    async () => {
      try {
        const appName = await getAppName("Vite", "vite-project");
        const projectRoot = await getProjectRoot("Vite");
        const template = await getViteTemplateName(
          "Enter the template name (react, vue, etc.,)"
        );
        const variant = await getViteVariant();
        const command = getViteCommand(appName, template, variant);

        info("Started building Vite project");

        await createProject(appName, projectRoot, command, "Vite App Creation");
      } catch (e) {
        error(
          `An error occurred: ${
            e instanceof Error ? e.message : "Unknown error"
          }`
        );
      }
    }
  );

  return disposable;
}
