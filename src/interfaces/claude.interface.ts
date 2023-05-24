export interface ClaudeAIResponse {
  completion: string;
  stop: string;
  stop_reason: string;
  truncated: boolean;
  log_id: string;
  model: string;
  exception?: string;
}

/**
 * Supported models for querying Claude.
 */
type ClaudeModel =
  | 'claude-v1' // Our largest model, ideal for a wide range of more complex tasks.
  | 'claude-v1-100k' // Enhanced version of claude-v1 with a 100,000 token context window. Ideal for analyzing and querying long documents and conversations.
  | 'claude-instant-v1' // Smaller model with lower latency, suitable for text classification, summarization, and lightweight chat applications.
  | 'claude-instant-v1-100k'; // Enhanced version of claude-instant-v1 with a 100,000 token context window, providing speed and additional context.

/**
 * Specific sub-versions of the Claude models.
 */
type ClaudeSubVersion =
  | 'claude-v1.3' // More robust against red-team inputs, better at precise instruction-following, code, and non-English dialogue and writing.
  | 'claude-v1.3-100k' // Enhanced version of claude-v1.3 with a 100,000 token context window.
  | 'claude-v1.2' // Improved version of claude-v1 with better general helpfulness, instruction following, coding, and non-English languages.
  | 'claude-v1.0' // Earlier version of claude-v1.
  | 'claude-instant-v1.1' // Latest version of claude-instant-v1 with improvements in writing, coding, and instruction following.
  | 'claude-instant-v1.1-100k' // Enhanced version of claude-instant-v1.1 with a 100,000 token context window.
  | 'claude-instant-v1.0'; // Earlier version of claude-instant-v1.

/**
 * Supported models for querying Claude, including specific sub-versions.
 */
export type ClaudeSupportedModel = ClaudeModel | ClaudeSubVersion;
