import { ClaudeSupportedModel } from './claude.interface';

export type LLM = 'chatGPT' | 'claudeAI' | 'bard';

export type OpenAIModel =
  | 'gpt-3.5-turbo' // Most capable GPT-3.5 model optimized for chat at 1/10th the cost of text-davinci-003.
  | 'gpt-3.5-turbo-0301' // Snapshot of gpt-3.5-turbo from March 1st, 2023. Will be deprecated after 3 months of a new version's release.
  | 'text-davinci-003' // Can perform any language task with better quality, longer output, and consistent instruction-following.
  | 'text-davinci-002' // Similar capabilities to text-davinci-003, but trained with supervised fine-tuning.
  | 'code-davinci-002' // Optimized for code completion tasks.
  | 'gpt-4' // More capable than any GPT-3.5 model, able to do more complex tasks, and optimized for chat. Will be updated with our latest model iteration.
  | 'gpt-4-0314' // Snapshot of gpt-4 from March 14th, 2023. Will be deprecated after 3 months of a new version's release.
  | 'gpt-4-32k' // Same capabilities as the base gpt-4 model but with 4x the context length. Will be updated with our latest model iteration.
  | 'gpt-4-32k-0314'; // Snapshot of gpt-4-32k from March 14th, 2023. Will be deprecated after 3 months of a new version's release.

export interface AdapterConfig {
  type: LLM;
  baseurl: string;
  apiKey: string;
  model?: OpenAIModel | ClaudeSupportedModel;
}
