export type LLM = 'chatGPT' | 'claudeAI' | 'bard';

export interface AdapterConfig {
  type: LLM;
  baseurl: string;
  apiKey: string;
  model?: string;
}