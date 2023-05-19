const {  CompletionServiceSelector } = require('../dist/index');

async function completePrompt(prompt, maxTokens) {
  const config = {
    apiKey: '',
    baseurl: 'https://api.anthropic.com/v1/complete',
    type: 'claudeAI',
  };

  const service = new CompletionServiceSelector(config);

  const response = await service.complete(prompt, maxTokens);
  console.log(response);
}

completePrompt('What is the capital of united states', 300)
  .then(data => {
    console.log(data);
  })
  .catch(() => {});
