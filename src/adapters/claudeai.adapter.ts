import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CompletionService } from '../interfaces/completion.interface';
import {
  ClaudeAIResponse,
  ClaudeSupportedModel,
} from '../interfaces/claude.interface';
import { AdapterConfig, Message } from '../interfaces';

export class ClaudeAIAdapter implements CompletionService {
  private readonly axiosInstance: AxiosInstance;
  private readonly model: ClaudeSupportedModel;

  constructor(adapterConfig: AdapterConfig) {
    this.axiosInstance = axios.create({
      timeout: adapterConfig.timeout || 10*1000,
      baseURL: adapterConfig.baseurl,
      headers: {
        'x-api-key': adapterConfig.apiKey,
        'content-type': 'application/json',
      },
      maxBodyLength: Infinity,
    });
    this.model = adapterConfig.model as ClaudeSupportedModel;
  }

  async complete(prompt: string, maxTokens: number): Promise<string> {
    console.log('Claude adapter called ...');
    try {
      const data = {
        prompt: `\n\nHuman: ${prompt}\n\nAssistant: `,
        model: this.model,
        max_tokens_to_sample: maxTokens,
        stop_sequences: ['\n\nHuman:'],
      };

      const config: AxiosRequestConfig = {
        method: 'post',
        data,
      };

      const response = await this.axiosInstance.request<ClaudeAIResponse>(
        config
      );
      return response.data.completion;
    } catch (error) {
      console.error('Error completing prompt:', error);
      throw error;
    }
  }

  async getChatCompletions(
    messages: Message[],
    maxTokens: number
  ): Promise<string> {
    const prompt = messages
      .map(message => `${message.role}: ${message.content}`)
      .join('\n\n');
    const data = {
      prompt,
      model: this.model,
      max_tokens_to_sample: maxTokens,
      stop_sequences: ['\n\nHuman:'],
    };

    console.log({data});

    try {
      const response = await this.axiosInstance.post<ClaudeAIResponse>(
        '',
        data
      );
      return response.data.completion;
    } catch (error) {
      console.error('Error getting chat completions:', error);
      throw error;
    }
  }
}
