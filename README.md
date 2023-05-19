# llms-client

A package that allows users to connect to multiple Language Models (LLMs) including Claude, Bard, and ChatGPT.

## Installation

Install the package using npm:

```bash
npm install llms-client
```

## Usage

To use the package, import and create an instance of the `CompletionServiceSelector` class, providing the appropriate adapter configuration. The adapter configuration should include the type of LLM and the required base URL and API key.

```typescript
import { CompletionServiceSelector, AdapterConfig } from 'llms-client';

const adapterConfig: AdapterConfig = {
  type: 'chatGPT',
  baseurl: 'https://api.example.com',
  apiKey: 'your-api-key'
};

const completionService = new CompletionServiceSelector(adapterConfig);

completionService.complete('prompt text', 100)
  .then((response: string) => {
    // Handle the completion response
    console.log(response);
  })
  .catch((error: Error) => {
    // Handle errors
    console.error(error);
  });
```

## Adapter Configuration

The adapter configuration should contain the following properties:

- `type`: The type of language model. Valid values are `'chatGPT'`, `'claudeAI'`, and `'bard'`.
- `baseurl`: The base URL of the language model API.
- `apiKey`: (Optional) The API key required for accessing the language model API.

## Available Scripts

In the project's `package.json` file, the following scripts are available:

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

The package can be configured using the `package.json` file. Here are some important fields:

- `name`: The name of the package.
- `author`: The author of the package.
- `module`: The entry point for the package's ES module version.

## License

This package is licensed under the MIT License.

## Author

This package was created by Shanur Rahman.