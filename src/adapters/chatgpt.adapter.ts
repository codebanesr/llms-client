import axios, { AxiosInstance } from 'axios';
import { CompletionService } from '../interfaces/completion.interface';
import { OpenAIModel } from '../interfaces';

export class ChatGPTAdapter implements CompletionService {
  private readonly axiosInstance: AxiosInstance;
  private readonly model: string;

  constructor(baseurl: string, apiKey: string, model: OpenAIModel) {
    this.axiosInstance = axios.create({
      baseURL: baseurl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });
    this.model = model;
  }

  async complete(prompt: string, maxTokens: number): Promise<string> {
    try {
      const response = await this.axiosInstance.post('', {
        model: this.model,
        prompt,
        max_tokens: maxTokens,
        temperature: 0,
      });

      console.log(response);

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
    console.log({ unused: maxTokens });
    const requestData: ChatCompletionRequest = {
      model: this.model,
      messages,
    };

    try {
      const response = await this.axiosInstance.post<ChatCompletionResponse>(
        '',
        requestData
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
}
