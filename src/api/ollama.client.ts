import { config } from "../config/config";
import { parseJsonStream, postStream } from "../utils/utils";

interface OllamaChunk {
  response?: string;
  done?: boolean;
}

export async function* streamResponse(
  userPrompt: string
): AsyncGenerator<string> {
  const url = `${config.ollama.endpoint}/api/generate`;

  const prompt = `${config.ollama.systemPrompt}\nUser request: ${userPrompt}`;

  const response = await postStream(url, {
    model: config.ollama.defaultModel,
    prompt,
    stream: true,
  });

  if (response.status === 404) {
    console.error("Ollama model not found:", config.ollama.defaultModel);
    throw new Error(
      `Ollama model not found: ${config.ollama.defaultModel}. Please ensure the model is available.`
    );
  }

  if (response.status < 200 || response.status >= 300 || !response.data) {
    console.error("Ollama API error:", response.status, response.statusText);
    throw new Error(`Ollama error: ${response.status} ${response.statusText}`);
  }

  for await (const json of parseJsonStream<OllamaChunk>(response.data)) {
    if (json.response) {
      yield json.response;
    }
    if (json.done) {
      return;
    }
  }
}
