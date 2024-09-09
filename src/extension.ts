import * as vscode from "vscode";
import cra from "./commands/cra";
import vite from "./commands/vite";
import { showWelcomeMessage } from "./utils/welcomeMessage";

export function activate(context: vscode.ExtensionContext) {
  const hasShownWelcome = context.globalState.get("hasShownWelcome", false);

  if (!hasShownWelcome) {
    showWelcomeMessage(context);
  }

  const craCommand = cra();
  context.subscriptions.push(craCommand);

  const viteCommand = vite();
  context.subscriptions.push(viteCommand);
}

export function deactivate() {}
