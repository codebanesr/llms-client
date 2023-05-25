import axios, { AxiosInstance } from 'axios';
import { CompletionService } from '../interfaces/completion.interface';
import { AdapterConfig, Message, OpenAIModel } from '../interfaces';

export class ChatGPTAdapter implements CompletionService {
  private readonly axiosInstance: AxiosInstance;
  private readonly model: string;

  constructor(adapterConfig: AdapterConfig) {
    this.axiosInstance = axios.create({
      timeout: adapterConfig.timeout || 10*1000,
      baseURL: adapterConfig.baseurl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adapterConfig.apiKey}`,
      },
    });
    this.model = adapterConfig.model as OpenAIModel;
  }

  async complete(prompt: string, maxTokens: number): Promise<string> {
    try {
      const response = await this.axiosInstance.post('/v1/completions', {
        model: this.model,
        prompt,
        max_tokens: maxTokens,
        temperature: 0,
      });

      return response.data.choices[0].text;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getChatCompletions(
    messages: Message[],
    maxTokens: number
  ): Promise<string> {
    console.log({ messages, maxTokens });

    const data = {
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
    };

    try {
      const response = await this.axiosInstance.post<ChatCompletionResponse>(
        '/v1/chat/completions',
        data
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
      throw error;
    }
  }
}
