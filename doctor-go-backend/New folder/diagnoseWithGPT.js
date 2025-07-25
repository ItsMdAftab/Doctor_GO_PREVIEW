const translateToEnglish = require('./gpt_translator');
const predictConditionsAndSpecialist = require('../mlModel');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function translateFromEnglish(text, targetLanguage) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful medical assistant that translates English diagnosis into the user\'s language.',
        },
        {
          role: 'user',
          content: `Translate this diagnosis to ${targetLanguage}: "${text}"`,
        },
      ],
      temperature: 0.3,
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("Translation failed:", err.message);
    return text; // fallback
  }
}

async function diagnoseWithGPT(symptomsText, targetLang) {
  // Step 1: Translate input to English
  const englishSymptoms = await translateToEnglish(symptomsText);

  // Step 2: Run the existing rule-based condition checker
const { conditions } = predictConditionsAndSpecialist(englishSymptoms);

  // Step 3: Translate each part of the output back to the targetLang
  const translatedConditions = await Promise.all(
    conditions.map(async (cond) => {
      const name = await translateFromEnglish(cond.name, targetLang);
      const description = await translateFromEnglish(cond.description, targetLang);
      const specialist = await translateFromEnglish(cond.specialist, targetLang);
      const extraSymptoms = cond.extraSymptoms
        ? await Promise.all(
            cond.extraSymptoms.map(sym => translateFromEnglish(sym, targetLang))
          )
        : [];

      return {
        name,
        description,
        specialist,
        extraSymptoms
      };
    })
  );

  return translatedConditions;
}

module.exports = diagnoseWithGPT;
