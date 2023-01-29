const COHERE_API_KEY = import.meta.env.PUBLIC_COHERE_API_KEY
const COHERE_API_GENERATE_URL = "https://api.cohere.ai/generate"

export async function generateRecipe (ingredients: string[]) {
  const response = await fetch(COHERE_API_GENERATE_URL, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${COHERE_API_KEY}`,
      'Content-Type': 'application/json',
      'Cohere-Version': '2022-12-06'
    },
    body: JSON.stringify({
      model: 'command-xlarge-20221108',
      prompt: `Write a full recipe with detailed instructions that includes, as minimum, the following ingredients:\n${ingredients.map(ingd => `- ${ingd}`).join('\n')}`,
      max_tokens: 500,
      temperature: 0.7,
      k: 0,
      p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    })
  })
  const data = await response.json()
  return data.generations[0].text
}
