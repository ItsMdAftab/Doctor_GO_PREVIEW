// doctor-go-backend/utils/gptTranslator.js
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function translateToEnglish(text) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful medical assistant that translates symptoms into simple English.',
        },
        {
          role: 'user',
          content: `Translate this to English medical symptoms: "${text}"`,
        },
      ],
      temperature: 0.3,
    });

    const englishText = response.choices[0].message.content.trim();
    return englishText;
  } catch (error) {
    console.error('Translation error:', error.message);
    return text; // fallback to original input
  }
}

module.exports = translateToEnglish;
