const prompts = require('prompts');

(async () => {
    const response = await prompts({
        type: 'text',
        name: 'name',
        message: 'What is your name?'
    });

    console.log(response.name);
})();
