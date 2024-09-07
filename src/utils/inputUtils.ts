import * as vscode from "vscode";

export default async function input(
  prompt: string,
  placeHolder: string = "",
  validate: boolean = false
) {
  return await vscode.window.showInputBox({
    prompt,
    placeHolder,
    validateInput: validate
      ? (value) =>
          !value.trim() ? `${prompt.split(" ")[1]} cannot be empty...` : null
      : undefined,
  });
}
