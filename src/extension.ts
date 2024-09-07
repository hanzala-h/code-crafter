import * as vscode from "vscode";
import cra from "./commands/cra";
import vite from "./commands/vite";

export function activate(context: vscode.ExtensionContext) {
  const craCommand = cra();
  context.subscriptions.push(craCommand);

  const viteCommand = vite();
  context.subscriptions.push(viteCommand);
}

export function deactivate() {}
