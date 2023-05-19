import { BardAdapter, ChatGPTAdapter, ClaudeAIAdapter } from './adapters';
import { CompletionService } from './interfaces/completion.interface';


export type LLM = 'chatGPT' | 'claudeAI' | 'bard';
export interface AdapterConfig {
  type: LLM;
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
