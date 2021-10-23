import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vs-tictactoe" is now active!');

  let disposable = vscode.commands.registerCommand(
    "vs-tictactoe.ttt",
    async () => {
      const response = await vscode.window.showInformationMessage(
        "Do you like Next.js",
        "Yes",
        "Of course"
      );
      console.log(response);
    }
  );

  context.subscriptions.push(disposable);
}
export function deactivate() {}
