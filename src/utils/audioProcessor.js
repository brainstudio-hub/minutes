
import axios from 'axios';

// Note: In a production environment, API keys should be handled securely via backend proxy.
// Since this is a frontend-only prototype, we are using the provided key directly.
const OPENAI_API_KEY = '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';
const WHISPER_API_URL = 'https://api.openai.com/v1/audio/transcriptions';

export const processAudio = async (file) => {
  if (!file) {
    throw new Error('No audio file provided');
  }

  // Updated to 25MB Limit
  const MAX_SIZE = 25 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('El archivo no debe exceder 25MB.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('model', 'whisper-1');
  formData.append('language', 'es'); // Force Spanish
  // Optional: prompt to guide style or vocabulary
  // formData.append('prompt', 'Transcribe la siguiente reunión de negocios en español.');

  try {
    const response = await axios.post(WHISPER_API_URL, formData, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data && response.data.text) {
      return response.data.text;
    } else {
      throw new Error('La respuesta de la API no contiene texto.');
    }
  } catch (error) {
    console.error('Whisper API Error:', error);
    if (error.response) {
      // Check for specific Whisper API error from the image
      if (error.response.status === 403 && error.response.data?.error?.message.includes("does not have access to model 'whisper-1'")) {
        throw new Error(`Error de transcripción (403): Tu proyecto no tiene acceso al modelo 'whisper-1'. Por favor, verifica tu plan y permisos de OpenAI.`);
      }
      throw new Error(`Error de transcripción (${error.response.status}): ${error.response.data?.error?.message || error.message}`);
    }
    throw new Error(`Error de conexión: ${error.message}`);
  }
};
