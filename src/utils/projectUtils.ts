import * as vscode from "vscode";
import { input } from "./inputUtils";
import { exec } from "child_process";
import { progress, info, error } from "./messageUtils";
import { createOutputChannel, output } from "./outputUtils";
import path from "path";
import { directoryExists } from "./fileUtils";

/**
 * Prompts the user to enter the name of their project.
 * If no input is provided, the `defaultName` is returned.
 *
 * @param {string} appTitle - The title of the application to be used in the prompt message.
 * @param {string} defaultName - The default name to return if the user does not provide any input.
 * @returns {Promise<string>} - The name provided by the user or the default name if no input is provided.
 */
export async function getAppName(
  appTitle: string,
  defaultName: string
): Promise<string> {
  return (
    (await input(`Enter the name of your ${appTitle} project`, defaultName)) ||
    defaultName
  );
}

/**
 * Prompts the user to enter the root directory for their project.
 * If no input is provided, the current workspace folder is returned.
 *
 * @param {string} appTitle - The title of the application to be used in the prompt message.
 * @returns {Promise<string>} - The root directory provided by the user or the workspace directory if no input is provided.
 */
export async function getProjectRoot(appTitle: string): Promise<string> {
  const defaultRoot = vscode.workspace.workspaceFolders
    ? vscode.workspace.workspaceFolders[0].uri.fsPath
    : process.cwd();

  return (
    (await vscode.window.showInputBox({
      prompt: `Enter the root of your ${appTitle} project`,
      value: defaultRoot,
    })) || defaultRoot
  );
}
/**
 * Prompts the user to enter the template name for a Vite project.
 * If no input is provided, the `defaultTemplate` is returned.
 *
 * @param {string} prompt - The prompt message displayed to the user.
 * @param {string} [defaultTemplate="vanilla"] - The default template to return if the user provides no input.
 * @returns {Promise<string>} - The template name provided by the user or the default template if no input is provided.
 */
export async function getViteTemplateName(
  prompt: string,
  defaultTemplate: string = "vanilla"
): Promise<string> {
  return (await input(prompt, defaultTemplate)) || defaultTemplate;
}

/**
 * Prompts the user to enter a variant for the Vite project.
 * Returns '-ts' if the variant contains 'type' or 'ts', indicating a TypeScript variant.
 * Defaults to JavaScript and returns an empty string if no variant or a non-TypeScript variant is specified.
 *
 * @returns {Promise<string>} - Returns '-ts' for TypeScript variant or an empty string for JavaScript.
 */
export async function getViteVariant(): Promise<string> {
  const variant = await input("Enter the variant, leave blank if js", "js");

  return variant?.toLowerCase().includes("type") ||
    variant?.toLowerCase().includes("ts")
    ? "-ts"
    : "";
}

/**
 * Constructs a Vite project creation command based on the provided application name, template, and variant.
 *
 * @param {string} app - The name of the application (used as the project folder name).
 * @param {string} template - The framework template to use (e.g., 'react', 'vue').
 * @param {string} variant - The variant for the template (e.g., '-ts' for TypeScript). Can be an empty string for default JavaScript.
 * @returns {string} - The fully constructed command to create a Vite project.
 */
export function getViteCommand(
  app: string,
  template: string,
  variant: string
): string {
  const appName = app.trim();
  const templateName = template.trim();
  const variantSuffix = variant.trim();

  return `npm create vite@latest ${appName} -- --template ${templateName}${variantSuffix}`;
}

/**
 * Creates a project by running a specified command and displays progress in a VSCode output channel.
 *
 * This function checks if the target directory already exists before proceeding with the project creation.
 * If the directory exists, it throws an error to prevent overwriting the existing project.
 * Otherwise, it executes the provided command to generate the project (e.g., React or Vite) and displays
 * progress, success, or failure messages in a specified output channel.
 *
 * @param {string} appName - The name of the project to be created. This is used as the folder name where the project will be generated.
 * @param {string} projectRoot - The root directory where the project will be created. The final path will be `projectRoot/appName`.
 * @param {string} command - The command to be executed for creating the project (e.g., `npx create-react-app` or `npm init vite`).
 * @param {string} channelName - The name of the VSCode output channel where progress and results will be shown.
 *
 * @throws {Error} Throws an error if the target directory already exists.
 *
 * @returns {Promise<void>} A promise that resolves once the project is successfully created, or rejects if an error occurs.
 */
export async function createProject(
  appName: string,
  projectRoot: string,
  command: string,
  channelName: string
) {
  const targetPath = path.join(projectRoot, appName);

  if (directoryExists(targetPath)) {
    error(`Directory "${appName}" already exists.`);
    throw new Error(`Directory "${appName}" already exists.`);
  }

  const outputChannel = createOutputChannel(channelName);

  await progress(
    `Creating ${appName} application`,
    () =>
      new Promise<void>((resolve, reject) => {
        exec(command, { cwd: projectRoot }, (err, stdout, stderr) => {
          if (err) {
            error(`Error creating application: ${stderr}`);
            reject(err);
          } else {
            const msg = `${appName} application created successfully.`;
            info(msg);
            output(outputChannel, "Success", msg, stdout);
            resolve();
          }
        });
      })
  );
}
