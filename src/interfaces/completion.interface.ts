export interface CompletionService {
  complete(prompt: string, maxTokens: number): Promise<string>;
}
