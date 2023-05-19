import axios from "axios";
import { CompletionService } from "../interfaces/completion.interface";

export class ChatGPTAdapter implements CompletionService {
  private readonly baseurl: string;
  private readonly apiKey: string;

  constructor(baseurl: string, apiKey: string) {
    this.baseurl = baseurl;
    this.apiKey = apiKey;
  }

  async complete(prompt: string, maxTokens: number): Promise<string> {
    const response = await axios.post(this.baseurl, {
      prompt,
      max_tokens: maxTokens,
    }, {
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.choices[0].text;
  }
}