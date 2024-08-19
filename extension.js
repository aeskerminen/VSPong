const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "vspong" is now active!');

  const disposable = vscode.commands.registerCommand(
    "pong.Pong",
    function () {
      vscode.window.showInformationMessage("Hello World from VSPong!");

      const view = vscode.window.createWebviewPanel(
        "pong",
        "Pong",
        vscode.ViewColumn.One,
        {}
      );
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
