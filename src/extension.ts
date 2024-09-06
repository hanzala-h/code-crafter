import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "code-crafter" is now active!');

	const disposable = vscode.commands.registerCommand('code-crafter.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Code Crafter!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
