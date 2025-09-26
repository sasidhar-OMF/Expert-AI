import * as vscode from "vscode";
import { streamResponse } from "../api/ollama.client";

export function registerJsHelperParticipant(context: vscode.ExtensionContext) {
  const participant = vscode.chat.createChatParticipant(
    "jsHelper",
    async (request, ctx, stream) => {
      try {
        for await (const chunk of streamResponse(request.prompt)) {
          await stream.markdown(chunk);
        }
      } catch (err: any) {
        console.error("Error in JS Helper Participant:", err);
        await stream.markdown(`❌ Something went wrong`);
      }
    }
  );

  context.subscriptions.push(participant);
}
