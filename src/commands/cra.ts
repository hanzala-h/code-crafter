import * as vscode from 'vscode';
import { exec } from 'child_process';
import { info, error } from '../utils/messageUtils';
import input from '../utils/inputUtils';

/**
 * Registers a VSCode command to create a React application using Create React App (CRA).
 * @returns vscode.Disposable
 */
export default function cra(): vscode.Disposable {
  const disposable = vscode.commands.registerCommand('code-crafter.cra', async () => {
    try {
      info('Started building your React application...');

      const appName = await input('Enter the name of your React project', 'react-app');

      if (!appName) {
        error('No project name provided. Command cancelled.');
        return;
      }

      exec(`npx create-react-app ${appName}`, (err, stdout, stderr) => {
        if (err) {
          error(`Error creating React application: ${stderr}`);
          return;
        }

        info(`React application "${appName}" created successfully.`);
      });

    } catch (e) {
      error(`An error occurred: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
  });

  return disposable;
}
