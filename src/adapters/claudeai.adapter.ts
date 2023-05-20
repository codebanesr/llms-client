import axios, { AxiosRequestConfig } from 'axios';
import { CompletionService } from '../interfaces/completion.interface';
import { ClaudeSupportedModel } from '../interfaces/claude';

export class ClaudeAIAdapter implements CompletionService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly model: ClaudeSupportedModel;

  constructor(apiUrl: string, apiKey: string, model: ClaudeSupportedModel) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.model = model;
  }

  async complete(prompt: string, maxTokens: number): Promise<string> {
    console.log('Claude adapter called ...');
    try {
      let data = {
        prompt: `\n\nHuman: ${prompt}\n\nAssistant: `,
        model: this.model,
        max_tokens_to_sample: maxTokens,
        stop_sequences: ['\n\nHuman:'],
      };

      let config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: this.apiUrl,
        headers: {
          'x-api-key': this.apiKey,
          'content-type': 'application/json',
        },
        timeout: 10 * 1000,
        data: data,
      };

      const response = await axios.request<ClaudeAIResponse>(config);
      // Return the first choice from the response
      return response.data.completion;
    } catch (error) {
      console.error('Error completing prompt:', error);
      throw error;
    }
  }
}

interface ClaudeAIResponse {
  completion: string,
  stop: string,
  stop_reason: string,
  truncated: boolean,
  log_id: string,
  model: string,
  exception?: string
}
