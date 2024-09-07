import * as vscode from "vscode";
import { exec } from "child_process";
import { info, error, progress } from "../utils/messageUtils";
import { getAppName, getProjectRoot } from "../utils/projectUtils";
import { createOutputChannel, output } from "../utils/inputUtils";

const outputChannel = createOutputChannel("React Application");

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
              const msg = `React application "${appName}" created successfully.`;
              info(msg);
              output(outputChannel, "Success", msg, stdout);
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
        const appName = await getAppName("React", "react-app");

        const projectRoot = await getProjectRoot("React");

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
