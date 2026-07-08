import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for Gemini
  app.post('/api/gemini/generate', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'Gemini API key is not configured.' });
      }

      const ai = new GoogleGenAI({ apiKey });
      const { model, contents, config, prompt, method } = req.body;
      
      if (method === 'generateVideos') {
         const operation = await ai.models.generateVideos({
            model: model || 'veo-3.1-fast-generate-preview',
            prompt,
            config,
         });
         return res.json({ operationName: operation.name });
      } else if (method === 'getVideosOperation') {
          const operation = await ai.operations.getVideosOperation({
              operation: req.body.operation
          });
          return res.json(operation);
      } else if (method === 'getVideoGenerationResult') {
          const operation = await ai.models.getVideoGenerationResult({
              operationId: req.body.operationId
          });
          return res.json(operation);
      } else if (method === 'downloadVideo') {
          const { uri } = req.body;
          if (!uri) return res.status(400).json({ error: 'Missing uri' });
          const fetchRes = await fetch(`${uri}&key=${apiKey}`);
          if (!fetchRes.ok) {
              return res.status(fetchRes.status).json({ error: fetchRes.statusText });
          }
          res.setHeader('Content-Type', fetchRes.headers.get('Content-Type') || 'video/mp4');
          const buffer = await fetchRes.arrayBuffer();
          return res.send(Buffer.from(buffer));
      } else if (method === 'generateContentStream') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.setHeader('Transfer-Encoding', 'chunked');
          const stream = await ai.models.generateContentStream({
            model: model || 'gemini-2.5-flash',
            contents,
            config
          });
          for await (const chunk of stream) {
            if (chunk.text) {
              res.write(chunk.text);
            }
          }
          return res.end();
      } else {
          const response = await ai.models.generateContent({
            model: model || 'gemini-2.5-flash',
            contents,
            config
          });
          return res.json(response);
      }
    } catch (error: any) {
      console.error('Error generating content:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
