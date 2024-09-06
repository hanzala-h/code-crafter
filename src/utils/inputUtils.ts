import * as vscode from 'vscode';

export default async function input(prompt: string, placeHolder: string){
  return await vscode.window.showInputBox({
    prompt, placeHolder, validateInput: value => !value.trim() ? 'Project name cannot be empty...' : null
  });
}