# Minutes Backend (Railway)

Este servicio funciona como proxy para las llamadas a OpenAI y evita CORS en el frontend.

## Variables de entorno (Railway)

- `OPENAI_API_KEY` (obligatoria): clave de OpenAI.
- `PORT` (opcional): Railway lo asigna automáticamente.

## Endpoints

- `POST /api/openai/v1/chat/completions`
- `POST /api/openai/v1/audio/transcriptions`
- `GET /health`

## Configuración del frontend

En el frontend, define la URL base del backend (Railway) con:

```
VITE_API_BASE_URL=https://<tu-backend>.railway.app
```

Con esto, el frontend enviará las solicitudes a `https://<tu-backend>.railway.app/api/openai/...`.
