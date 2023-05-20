import axios from 'axios';
import { CompletionService } from '../interfaces/completion.interface';
import { OpenAIModel } from '../interfaces';

export class ChatGPTAdapter implements CompletionService {
  private readonly baseurl: string;
  private readonly apiKey: string;
  private readonly model: string;

  constructor(baseurl: string, apiKey: string, model: OpenAIModel) {
    this.baseurl = baseurl;
    this.apiKey = apiKey;
    this.model = model;
  }

  async complete(prompt: string, maxTokens: number): Promise<string> {
    try {
      const response = await axios.post(
        this.baseurl,
        {
          model: this.model,
          prompt: prompt,
          max_tokens: maxTokens,
          temperature: 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      console.log(response);

      return response.data.choices[0].text;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
