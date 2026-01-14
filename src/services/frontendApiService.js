import axios from 'axios';

// API Keys
const OPENAI_API_KEY = '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';
const FIREFLIES_API_KEY = 'f42ce5bc-ad1a-4d10-973f-3df2c75327e6';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const FIREFLIES_API_URL = 'https://api.fireflies.ai/graphql';

// Helper for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const frontendApiService = {
  // OpenAI API Call with retry logic
  generateCompletion: async (prompt, systemMessage = "You are a helpful assistant.") => {
    // Add Spanish instruction to system message
    const languageInstruction = " Responde SIEMPRE en español. Todos los textos, títulos, labels deben estar en español.";
    const finalSystemMessage = systemMessage + languageInstruction;

    let retries = 3;
    let attempt = 0;

    while (attempt < retries) {
      try {
        const response = await axios.post(
          OPENAI_API_URL,
          {
            model: "gpt-5.2-pro",
            messages: [
              { role: "system", content: finalSystemMessage },
              { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }, // Enforce JSON mode
            temperature: 0.7
          },
          {
            headers: {
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );
      

        return response.data.choices[0].message.content;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Rate limited
          attempt++;
          const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
          console.warn(`Rate limited by OpenAI. Retrying in ${waitTime}ms...`);
          await delay(waitTime);
        } else {
          console.error("OpenAI API Error:", error);
          throw new Error(error.response?.data?.error?.message || "Failed to generate completion from OpenAI");
        }
      }
    }
    throw new Error("Failed to connect to OpenAI after multiple attempts due to rate limiting.");
  },

  // Batch Analysis Helper
  // Takes an array of file objects { title, text, type } and prepares a combined context
  generateBatchAnalysis: async (files, analysisType) => {
    if (!files || files.length === 0) throw new Error("No files provided for analysis");

    // Concatenate contents
    let combinedContext = "A continuación se presentan los contenidos de múltiples fuentes para su análisis integrado:\n\n";
    
    files.forEach((file, index) => {
      combinedContext += `--- FUENTE ${index + 1}: ${file.title} (${file.type}) ---\n`;
      combinedContext += `${file.text.substring(0, 20000)} \n\n`; // Limit per file to avoid context window explosion
    });

    return combinedContext;
  },

  // Fireflies GraphQL Call
  fetchFirefliesData: async (query, variables = {}) => {
@@ -117,26 +109,26 @@ const frontendApiService = {
      }
    `;
    return frontendApiService.fetchFirefliesData(query, { limit, skip });
  },

  getTranscriptDetails: async (id) => {
    const query = `
      query Transcript($id: String!) {
        transcript(id: $id) {
          id
          title
          date
          duration
          sentences {
            speaker_name
            text
            start_time
          }
        }
      }
    `;
    return frontendApiService.fetchFirefliesData(query, { id });
  }
};

export default frontendApiService;
