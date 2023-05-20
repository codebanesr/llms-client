import axios from 'axios';
import { CompletionService } from '../interfaces/completion.interface';

export class BardAdapter implements CompletionService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  async complete(prompt: string, maxTokens: number): Promise<string> {
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${this.apiKey}`;
      axios.defaults.headers.common['Content-Type'] = `application/json`;

      const response = await axios.post<BardAiResponse>(this.apiUrl, {
        prompt,
        maxTokens,
      });

      if (response.status === 200) {
        return response.data.completion;
      } else {
        throw new Error(`Error completing prompt: ${response.status}`);
      }
    } catch (error) {
      console.error('Error completing prompt:', error);
      throw error;
    }
  }

  getChatCompletions(messages: Message[], maxTokens: number): Promise<string> {
    console.log({ messages, maxTokens });
    throw new Error('Method not implemented.');
  }
}

interface BardAiResponse {
  completion: string;
}
