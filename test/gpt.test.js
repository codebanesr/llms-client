const {  CompletionServiceSelector } = require('../dist/index');

async function completePrompt(prompt, maxTokens) {
  const config = {
    apiKey: '',
    baseurl: 'https://api.openai.com/v1/completions',
    type: 'chatGPT',
    model: 'text-davinci-003'
  };

  const service = new CompletionServiceSelector(config);

  const response = await service.complete(prompt, maxTokens);
  console.log(response);
}

completePrompt('What is the purpose of life ?', 300)
  .then(data => {
    console.log(data);
  })
  .catch(() => {});
