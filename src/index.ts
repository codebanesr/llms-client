import { BardAdapter, ChatGPTAdapter, ClaudeAIAdapter } from './adapters';
import { AdapterConfig, CompletionService } from './interfaces';

export class CompletionServiceSelector implements CompletionService {
  private adapter: CompletionService;

  constructor(adapterConfig: AdapterConfig) {
    switch (adapterConfig.type) {
      case 'chatGPT':
        if (!adapterConfig.model) {
          throw Error('Model is required for ChatGPT adapter');
        }
        this.adapter = new ChatGPTAdapter(
          adapterConfig.baseurl,
          adapterConfig.apiKey,
          adapterConfig.model
        );
        break;
      case 'claudeAI':
        this.adapter = new ClaudeAIAdapter(
          adapterConfig.baseurl,
          adapterConfig.apiKey
        );
        break;
      case 'bard':
        this.adapter = new BardAdapter(
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
