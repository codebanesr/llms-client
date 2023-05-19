import { ChatGPTAdapter } from './adapters/chatgpt.adapter';
import { ClaudeAIAdapter } from './adapters/claudeai.adapter';
import { CompletionService } from './interfaces/completion.interface';

interface AdapterConfig {
  type: 'chatGPT' | 'claudeAI';
  baseurl: string;
  apiKey: string;
}

export class CompletionServiceSelector implements CompletionService {
  private adapter: CompletionService;

  constructor(adapterConfig: AdapterConfig) {
    switch (adapterConfig.type) {
      case 'chatGPT':
        this.adapter = new ChatGPTAdapter(
          adapterConfig.baseurl,
          adapterConfig.apiKey || ''
        );
        break;
      case 'claudeAI':
        this.adapter = new ClaudeAIAdapter(
          adapterConfig.baseurl,
          adapterConfig.apiKey
        );
        break;
      default:
        throw Error(`Invalid adapter: ${adapterConfig.type}`);
    }
  }

  complete(prompt: string, maxTokens: number): Promise<string> {
    return this.adapter.complete(prompt, maxTokens);
  }
}
