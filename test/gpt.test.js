const {  CompletionServiceSelector } = require('../dist/index');

async function completePrompt(prompt, maxTokens) {
  const config = {
    apiKey: '',
    baseurl: 'https://api.openai.com',
    type: 'chatGPT',
    model: 'text-davinci-003'
  };

  const service = new CompletionServiceSelector(config);

  // const completion = await service.complete(prompt, maxTokens);
  // console.log({completion})
  
  // chat completion here
  const chat_completion = await service.getChatCompletions([{"role": "user", "content": "Hello!"}], maxTokens);
  console.log({chat_completion});
}

completePrompt('What is the purpose of life ?', 300)
  .then(data => {
    console.log(data);
  })
  .catch(() => {});
