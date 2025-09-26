import axios, { AxiosResponse } from "axios";
import { Readable } from "stream";

export async function* parseJsonStream<T = any>(
  stream: Readable
): AsyncGenerator<T> {
  let buffer = "";

  for await (const chunk of stream) {
    buffer += chunk.toString("utf-8");
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.trim()) {
        continue;
      }

      try {
        yield JSON.parse(line) as T;
      } catch {}
    }
  }
}

export async function postStream(
  url: string,
  body: any,
  headers: Record<string, string> = {}
): Promise<AxiosResponse> {
  return axios.post(url, body, {
    headers: { "Content-Type": "application/json", ...headers },
    responseType: "stream",
    validateStatus: () => true,
  });
}
