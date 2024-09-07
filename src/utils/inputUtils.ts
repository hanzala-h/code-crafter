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

export function createOutputChannel(name: string): vscode.OutputChannel {
  return vscode.window.createOutputChannel(name);
}

/**
 * Formats a timestamp for logging.
 * @returns A string representing the current timestamp.
 */
function getTimestamp(): string {
  const now = new Date();
  return now.toISOString(); // ISO format for consistency
}

/**
 * Displays a message with optional output in the provided VSCode output channel.
 *
 * @param channel - The VSCode output channel to display messages in.
 * @param title - The title or heading for the log entry.
 * @param msg - The main message to display.
 * @param out - The output content to display (optional).
 * @param logLevel - The log level (e.g., info, error, warning) to format the message (optional).
 */
export function output(
  channel: vscode.OutputChannel,
  title: string,
  msg: string,
  out?: string,
  logLevel: "info" | "error" | "warning" = "info"
) {
  const timestamp = getTimestamp();
  const formattedMsg = `[${timestamp}] [${logLevel.toUpperCase()}] ${title}: ${msg}`;

  channel.appendLine(formattedMsg);

  if (out) {
    channel.appendLine(`Output:\n${out}`);
  }

  channel.show();
}
