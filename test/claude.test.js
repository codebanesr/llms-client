const { CompletionServiceSelector } = require('../dist/index');

async function completePrompt(prompt, maxTokens) {
  const config = {
    apiKey: '',
    baseurl: 'https://api.anthropic.com/v1/complete',
    type: 'claudeAI',
    model: 'claude-v1'
  };

  const service = new CompletionServiceSelector(config);

  const completionResponse = await service.complete(prompt, maxTokens);
  console.log(completionResponse);

  /** 
   * the last message's content has to be left empty... This will be filled by claude 
   * */ 
  const messages = [
    { role: 'Human', content: 'Tell me a haiku about trees' },
    { role: 'Assistant', content: '' }
  ];

  const chatResponse = await service.getChatCompletions(messages, 300);
  console.log(chatResponse);
}

completePrompt('What is the capital of united states', 300)
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.error(e);
  });
