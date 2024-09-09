import * as vscode from "vscode";

/**
 * Displays an input box for user input in VSCode.
 *
 * @param {string} prompt - The message to display in the input box.
 * @param {string} [placeHolder=""] - The placeholder text for the input box.
 * @param {boolean} [validate=false] - Whether to validate the input.
 * @returns {Promise<string | undefined>} - The input provided by the user or undefined if canceled.
 */
export async function input(
  prompt: string,
  placeHolder: string = "",
  validate: boolean = false
): Promise<string | undefined> {
  return await vscode.window.showInputBox({
    prompt,
    placeHolder,
    validateInput: validate
      ? (value) =>
          !value.trim() ? `${prompt.split(" ")[1]} cannot be empty...` : null
      : undefined,
  });
}
