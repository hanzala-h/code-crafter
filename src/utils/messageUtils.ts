import * as vscode from "vscode";

export type MessageType = "info" | "error" | "warning" | "default";

/**
 * Displays a message in the VSCode editor based on the type
 * @param msg The message to be displayed.
 * @param type The type of the message ('info', 'error', 'warning'). Defaults to 'default' (info message).
 */
export function showMessage(msg: string, type: MessageType = "default"): void {
  switch (type) {
    case "info":
      vscode.window.showInformationMessage(msg);
      break;
    case "error":
      vscode.window.showErrorMessage(msg);
      break;
    case "warning":
      vscode.window.showWarningMessage(msg);
      break;
    default:
      vscode.window.showInformationMessage(msg);
  }
}

/**
 * Convenience method to show an information message.
 * @param msg The information message to display.
 */
export function info(msg: string): void {
  showMessage(msg, "info");
}

/**
 * Convenience method to show an error message.
 * @param msg The error message to display.
 */
export function error(msg: string): void {
  showMessage(msg, "error");
}

/**
 * Convenience method to show a warning message.
 * @param msg The warning message to display.
 */
export function warning(msg: string): void {
  showMessage(msg, "warning");
}

/**
 * Displays a progress message while running a long-running task.
 *
 * @param title - The title of the progress notification.
 * @param task - The async task function to execute, should return a Promise.
 * @param cancellable - Whether the task can be cancelled by the user (default: false).
 * @returns The result of the task, or an error message if rejected.
 */
export async function progress<T>(
  title: string,
  task: () => Promise<T>,
  cancellable: boolean = false
): Promise<T | void> {
  return vscode.window.withProgress<T | void>(
    {
      location: vscode.ProgressLocation.Notification,
      title,
      cancellable,
    },
    async (progress, token) => {
      try {
        return await task();
      } catch (e) {
        vscode.window.showErrorMessage(
          `Error during ${title}: ${
            e instanceof Error ? e.message : "Unknown error"
          }`
        );
        return;
      }
    }
  );
}
