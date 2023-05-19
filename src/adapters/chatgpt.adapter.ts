import axios from 'axios';
import { CompletionService } from '../interfaces/completion.interface';

export class ChatGPTAdapter implements CompletionService {
  private readonly baseurl: string;
  private readonly apiKey: string;

  constructor(baseurl: string, apiKey: string) {
    this.baseurl = baseurl;
    this.apiKey = apiKey;
  }

  async complete(prompt: string, maxTokens: number): Promise<string> {
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${this.apiKey}`;
      axios.defaults.headers.common['Content-Type'] = `application/json`;

      const response = await axios.post(this.baseurl, {
        prompt,
        max_tokens: maxTokens,
      });

      return response.data.choices[0].text;
    } catch (error) {
      console.error('Error occurred during API request:', error);
      throw error; // rethrow the error to propagate it if needed
    }
  }
}
