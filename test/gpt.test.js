const { CompletionServiceSelector } = require('../dist/index');

async function completePrompt(prompt, maxTokens) {
  const config = {
    apiKey: '',
    baseurl: 'https://api.openai.com',
    type: 'chatGPT',
    model: 'text-davinci-003',
  };

  const service = new CompletionServiceSelector(config);

  // only supports gpt-3.5-turbo
  const chat_completion = await service.getChatCompletions(
    [{ role: 'user', content: 'Hello!' }],
    maxTokens
  );
  console.log({ chat_completion });
}

completePrompt('What is the purpose of life ?', 300)
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.error(e);
  });
