export interface CompletionService {
  complete(prompt: string, maxTokens: number): Promise<string>;
  getChatCompletions(messages: Message[], maxTokens: number): Promise<string>;
}
