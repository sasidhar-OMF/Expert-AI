# JS Helper

A VS Code extension that integrates with LLMs to provide expert JavaScript assistance.

---

## Prerequisites

- **Node.js** >= 18  
- **VS Code** >= 1.104.0  
- **Ollama 3.1** installed locally  

---

## 1. Install Ollama 3.1

### macOS

```sh
brew install ollama/tap/ollama
```

#### Verify Installation

```sh
ollama --version
# Should print Ollama 3.1.x
```

---

## 2. Pull or Download a Model

Ollama requires a model to generate responses. For example, to pull a model:

```sh
ollama pull llama3.1
```

Check that the model is available:

```sh
ollama list
```

---

## 3. Configure Your Project

Clone this repository:

```sh
git clone https://github.com/sasidhar-OMF/Expert-AI.git
cd Expert-AI
```

Install dependencies:

```sh
npm install
```

Update the configuration (`src/config/config.ts`) with your Ollama endpoint and default model:

```typescript
export const config = {
  ollama: {
    endpoint: "http://127.0.0.1:11434",
    defaultModel: "llama3.1",
  },
};
```

---

## 4. Run Ollama Server

Ollama runs a local server for API requests:

```sh
ollama serve
```

The default endpoint will be:

```
http://127.0.0.1:11434
```

---

## 5. Build and Run VS Code Extension

Compile TypeScript:

```sh
npm run compile
```

Open VS Code with the extension:

```sh
code .
```

Press **F5** to launch the Extension Development Host.

Open the **Chat** panel and type:

```
@jsHelper <your query>
```

to interact with the LLM.

---

## 6. Usage Example

In the VS Code Chat panel:

```
@jsHelper Write a function to flatten nested arrays in JavaScript
```

- The extension streams the response from Ollama.
- Returns clean, ES6+ code with optional explanations.



https://github.com/user-attachments/assets/8e3ddeed-a393-49ae-af87-9284c1451879


