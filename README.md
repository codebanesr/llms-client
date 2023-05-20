# llms-client

A package that allows users to connect to multiple Language Models (LLMs) including Claude, Bard, and ChatGPT.

## Installation

To install the package, use npm:

```bash
npm install llms-client
```

## Usage

To use the package, follow these steps:

1. Import and create an instance of the `CompletionServiceSelector` class, providing the appropriate adapter configuration. The adapter configuration should include the type of LLM, base URL, and API key.

   ```typescript
   import { CompletionServiceSelector, AdapterConfig } from 'llms-client';

   const adapterConfig: AdapterConfig = {
     type: 'chatGPT', // Specify the desired language model: 'chatGPT', 'claudeAI', or 'bard'
     baseurl: '<base-url>', // Set the base URL for the adapter
     apiKey: '<api-key>', // Set the API key for authentication
     model: '<model>', // Optional: Specify the model for the adapter (if applicable)
   };
   ```

2. Get chat completions by providing a list of messages and the maximum number of tokens in the completion response.

   ```typescript
   const messages: Message[] = [
     { role: 'system', content: 'Welcome!' },
     { role: 'user', content: 'Hello, how are you?' },
     { role: 'assistant', content: 'I\'m doing well, thank you!' },
   ];

   const maxTokens = 100; // Maximum number of tokens in the completion response

   completionService.getChatCompletions(messages, maxTokens)
     .then((response: string) => {
       // Handle the completion response
       console.log(response);
     })
     .catch((error: Error) => {
       // Handle errors
       console.error(error);
     });
   ```

3. Make a completion with a prompt by providing the prompt and the maximum number of tokens in the completion response.

   ```typescript
   const prompt = 'Hello, world!';
   completionService.complete(prompt, maxTokens)
     .then((response: string) => {
       // Handle the completion response
       console.log(response);
     })
     .catch((error: Error) => {
       // Handle errors
       console.error(error);
     });
   ```

## Available Scripts

The following scripts are available in the project's `package.json` file:

- `start`: Starts the development server in watch mode.
- `build`: Builds the package for production.
- `test`: Runs tests for the package.
- `lint`: Lints the package's source code.
- `prepare`: Builds the package before publishing or versioning.
- `size`: Checks the package size using size-limit.
- `analyze`: Analyzes the package size and provides reasons using size-limit.

You can run these scripts using npm. For example:

```bash
npm run build
```

## Configuration

The package can be configured using the `package.json` file. Some important fields include:

- `name`: The name of the package.
- `author`: The author of the package.
- `module`: The entry point for the package's ES module version.

## License

This package is licensed under the MIT License.

## Author

This package was created by Shanur Rahman.