import { BardAdapter, ChatGPTAdapter, ClaudeAIAdapter } from './adapters';
import { AdapterConfig, CompletionService, Message } from './interfaces';


export * from './interfaces';
export class CompletionServiceSelector implements CompletionService {
  private adapter: CompletionService;

  constructor(adapterConfig: AdapterConfig) {
    switch (adapterConfig.type) {
      case 'chatGPT':
        if (!adapterConfig.model) {
          throw Error('Model is required for ChatGPT adapter');
        }
        this.adapter = new ChatGPTAdapter(adapterConfig);
        break;
      case 'claudeAI':
        this.adapter = new ClaudeAIAdapter(adapterConfig);
        break;
      case 'bard':
        this.adapter = new BardAdapter(adapterConfig);
        break;
      default:
        throw Error(`Invalid adapter: ${adapterConfig.type}`);
    }
  }

  getChatCompletions(messages: Message[], maxTokens: number): Promise<string> {
    return this.adapter.getChatCompletions(messages, maxTokens);
  }

  complete(prompt: string, maxTokens: number): Promise<string> {
    return this.adapter.complete(prompt, maxTokens);
  }
}
