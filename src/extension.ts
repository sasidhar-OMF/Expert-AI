import * as vscode from "vscode";
import { registerJsHelperParticipant } from "./participant/jshelper.participant";

export function activate(context: vscode.ExtensionContext) {
  registerJsHelperParticipant(context);
}

export function deactivate() {}
