const vscode = require("vscode");
const fs = require("fs");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "vspong" is now active!');

  const disposable = vscode.commands.registerCommand("pong.Pong", function () {
    vscode.window.showInformationMessage("Hello World from VSPong!");

    const view = vscode.window.createWebviewPanel(
      "pong",
      "Pong",
      vscode.ViewColumn.One,
      {
        localResourceRoots: [
          vscode.Uri.joinPath(context.extensionUri, "resources"),
        ],
        enableScripts: true,
      }
    );

    const htmlPath = vscode.Uri.joinPath(
      context.extensionUri,
      "resources",
      "game.html"
    );
    const htmlSrc = fs.readFileSync(htmlPath.fsPath, "utf-8");
    view.webview.html = htmlSrc;
    const names = ["Pong!!", "Pong?", "Pong..."];

    const updateGameState = () => {
      view.title = names[Math.floor(Math.random() * names.length)];
    };

    const interval = setInterval(() => {
      updateGameState();
    }, 5000);

    view.onDidDispose(
      () => {
        clearInterval(interval);
      },
      null,
      context.subscriptions
    );
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
