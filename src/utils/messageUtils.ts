import * as vscode from 'vscode';

export type MessageType = 'info' | 'error' | 'warning' | 'default';

/**
 * Displays a message in the VSCode editor based on the type
 * @param msg The message to be displayed.
 * @param type The type of the message ('info', 'error', 'warning'). Defaults to 'default' (info message).
 */
export function showMessage(msg: string, type: MessageType = 'default'): void {
  switch(type) {
    case 'info':
      vscode.window.showInformationMessage(msg);
      break;
    case 'error':
      vscode.window.showErrorMessage(msg);
      break;
    case 'warning':
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
    showMessage(msg, 'info');
}

/**
 * Convenience method to show an error message.
 * @param msg The error message to display.
 */
export function error(msg: string): void {
    showMessage(msg, 'error');
}

/**
 * Convenience method to show a warning message.
 * @param msg The warning message to display.
 */
export function warning(msg: string): void {
    showMessage(msg, 'warning');
}