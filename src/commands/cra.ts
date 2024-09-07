import * as vscode from "vscode";
import { exec } from "child_process";
import { info, error, progress } from "../utils/messageUtils";
import input from "../utils/inputUtils";

async function createReactApp(appName: string, projectRoot: string) {
  await progress(
    `Creating React application "${appName}"`,
    () =>
      new Promise<void>((resolve, reject) => {
        exec(
          `npx create-react-app ${appName}`,
          { cwd: projectRoot },
          (err, stdout, stderr) => {
            if (err) {
              error(`Error creating React application: ${stderr}`);
              reject(err);
            } else {
              info(`React application "${appName}" created successfully.`);
              resolve();
            }
          }
        );
      })
  );
}

/**
 * Registers a VSCode command to create a React application using Create React App (CRA).
 * @returns vscode.Disposable
 */
export default function cra(): vscode.Disposable {
  const disposable = vscode.commands.registerCommand(
    "code-crafter.cra",
    async () => {
      try {
        const appName =
          (await input("Enter the name of your React project", "react-app")) ||
          "react-app";
        const projectRoot =
          (await input("Enter the root of your React project", "cwd")) ||
          process.cwd();

        info("Started building your React application...");

        await createReactApp(appName, projectRoot);
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
