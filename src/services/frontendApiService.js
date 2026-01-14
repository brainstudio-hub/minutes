import axios from 'axios';

const FIREFLIES_API_KEY = import.meta.env.VITE_FIREFLIES_API_KEY || '';

const OPENAI_API_URL = '/api/openai/v1/chat/completions';
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
        const response = await axios.post(OPENAI_API_URL, {
          model: "gpt-5.1",
          messages: [
            { role: "system", content: finalSystemMessage },
            { role: "user", content: prompt }
          ],
          response_format: { type: "json_object" }, // Enforce JSON mode
          temperature: 0.7
        });

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
          if (error.message === 'Network Error' && !error.response) {
            throw new Error("Network Error: La llamada a OpenAI necesita un proxy/servidor para evitar CORS. Configura el proxy /api/openai en tu entorno.");
          }
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
    try {
      const response = await axios.post(
        FIREFLIES_API_URL,
        { query, variables },
        {
          headers: {
            'Authorization': `Bearer ${FIREFLIES_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data;
    } catch (error) {
        console.error("Fireflies API Error:", error);
        // CORS errors are common in frontend-only calls to some APIs.
        if (error.message === 'Network Error' && !error.response) {
            throw new Error("Network Error: This may be due to CORS restrictions on the Fireflies API when called directly from the browser. In a production environment, a proxy server is required.");
        }
        throw new Error(error.response?.data?.message || error.message || "Failed to fetch data from Fireflies");
    }
  },

  // Specific Fireflies Queries
  getTranscripts: async (limit = 50, skip = 0) => {
    const query = `
      query Transcripts($limit: Int, $skip: Int) {
        transcripts(limit: $limit, skip: $skip) {
          id
          title
          date
          duration
          organizer_email
        }
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
