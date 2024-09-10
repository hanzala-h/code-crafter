import * as vscode from "vscode";

/**
 * Displays a welcome message when the extension is first installed.
 * Provides options for users to rate the extension, visit the GitHub repo, or star it.
 *
 * @param {vscode.ExtensionContext} context - The VSCode extension context.
 */
export function showWelcomeMessage(context: vscode.ExtensionContext) {
  vscode.window
    .showInformationMessage(
      "Thank you for installing Code Crafter! 🎉 Please consider supporting us by rating, starring, or visiting our GitHub repository.",
      "Rate Extension",
      "GitHub Repo",
      "Star on GitHub"
    )
    .then((selection) => {
      if (selection === "Rate Extension") {
        vscode.env.openExternal(
          vscode.Uri.parse(
            "https://marketplace.visualstudio.com/items?itemName=MuhammadHanzla.code-crafter"
          )
        );
      } else if (selection === "GitHub Repo") {
        vscode.env.openExternal(
          vscode.Uri.parse("https://github.com/hanzala-h/code-crafter")
        );
      } else if (selection === "Star on GitHub") {
        vscode.env.openExternal(
          vscode.Uri.parse(
            "https://github.com/hanzala-h/code-crafter/stargazers"
          )
        );
      }
    });

  context.globalState.update("hasShownWelcome", true);
}
