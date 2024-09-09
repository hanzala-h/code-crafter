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
      "Thank you for installing [Your Extension Name]! 🎉 Please consider supporting us by rating, starring, or visiting our GitHub repository.",
      "Rate Extension",
      "GitHub Repo",
      "Star on GitHub"
    )
    .then((selection) => {
      if (selection === "Rate Extension") {
        vscode.env.openExternal(
          vscode.Uri.parse(
            "https://marketplace.visualstudio.com/items?itemName=your-extension-id"
          )
        );
      } else if (selection === "GitHub Repo") {
        vscode.env.openExternal(
          vscode.Uri.parse("https://github.com/your-repo-url")
        );
      } else if (selection === "Star on GitHub") {
        vscode.env.openExternal(
          vscode.Uri.parse("https://github.com/your-repo-url/stargazers")
        );
      }
    });

  context.globalState.update("hasShownWelcome", true);
}
