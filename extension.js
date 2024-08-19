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

    console.log(htmlSrc);

    /*	
    const updateGameState = () => {
		view.title = ["Pong!!", "Pong?", "Pong..."][
        Math.round(Math.random() * 3) - 1
      ];
      view.webview.html = htmlSrc;
    };

    const interval = setInterval(() => {
      updateGameState();
    }, 1000);

    view.onDidDispose(
      () => {
        clearInterval(interval);
      },
      null,
      context.subscriptions
    );
	*/
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
