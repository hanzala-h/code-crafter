import * as vscode from "vscode";
import cra from "./commands/cra";

export function activate(context: vscode.ExtensionContext) {
  const craCommand = cra();
  context.subscriptions.push(craCommand);
}

export function deactivate() {}
