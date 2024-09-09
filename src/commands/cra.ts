import * as vscode from "vscode";
import { getAppName, getProjectRoot } from "../utils/projectUtils";
import { createProject } from "../utils/projectUtils";
import { info, error } from "../utils/messageUtils";

export default function cra(): vscode.Disposable {
  const disposable = vscode.commands.registerCommand(
    "code-crafter.cra",
    async () => {
      try {
        const appName = await getAppName("React", "react-app");
        const projectRoot = await getProjectRoot("React");

        info("Started building your React application...");

        await createProject(
          appName,
          projectRoot,
          `npx create-react-app ${appName}`,
          "React Application"
        );
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
