import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const hasApiKey = !!process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
if (hasApiKey) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
}

const offlineTips: Record<string, string[]> = {
  ar: [
    'نصيحة الخبير: ركز على وضع أصابعك بشكل صحيح على صف الارتكاز قبل البدء.',
    'نصيحة الخبير: الدقة أهم من السرعة. أبطئ وركز على كل حرف.',
    'نصيحة الخبير: خذ نفساً عميقاً واسترخِ كتفيك قبل البدء بالتمرين.',
    'نصيحة الخبير: لا تنظر إلى لوحة المفاتيح! ثق بذاكرتك العضلية.',
    'نصيحة الخبير: التكرار هو أم المهارة. أعد التمرين حتى تتقنه.',
  ],
  en: [
    'Expert tip: Focus on accuracy first, speed will come naturally with practice.',
    'Expert tip: Keep your fingers curved and relaxed on the home row.',
    'Expert tip: Take regular breaks every 20 minutes to prevent fatigue.',
    'Expert tip: Practice daily for 15 minutes to build muscle memory.',
    'Expert tip: Sit up straight with your screen at eye level.',
  ]
};

let tipIndex = 0;

async function getLocalTip(language: string): Promise<string> {
  const lang = language === 'ar' ? 'ar' : 'en';
  const tips = offlineTips[lang] || offlineTips.ar;
  const tip = tips[tipIndex % tips.length];
  tipIndex++;
  return tip;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/quick-tip", async (req, res) => {
    try {
      const { lessonTitle, lessonContent, language } = req.body;

      if (!hasApiKey || !ai) {
        const tip = await getLocalTip(language || 'ar');
        return res.json({ tip });
      }

      const prompt = `أنت خبير محترف وموجه للطباعة باللمس.
قم بإعطاء نصيحة احترافية وسريعة وقصيرة جداً (لا تتجاوز جملتين) للطالب الذي يدرس الدرس التالي:
عنوان الدرس: ${lessonTitle}
محتوى الدرس: ${lessonContent}
لغة الدرس: ${language === 'ar' ? 'العربية' : 'الإنجليزية'}
اجعل النصيحة ذكية، ملهمة، ومركزة على وضعية الجلوس أو حركة الأصابع أو العامل النفسي، وابدأها بـ "نصيحة الخبير: ".`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      res.json({ tip: response.text });
    } catch (error) {
      console.error('Error generating tip:', error);
      const tip = await getLocalTip(req.body?.language || 'ar');
      res.json({ tip });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');

    // Check for embedded assets (standalone EXE mode)
    let embedded: Record<string, string> | null = null;
    try {
      embedded = require(path.join(__dirname, '_embedded.cjs'));
    } catch (e1) {
      try {
        embedded = require('./_embedded.cjs');
      } catch {}
    }

    if (embedded && Object.keys(embedded).length > 0) {
      const mimeTypes: Record<string, string> = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.webmanifest': 'application/manifest+json',
        '.map': 'application/json',
      };

      app.get('*', (req, res) => {
        let filePath = req.path === '/' ? 'index.html' : req.path.replace(/^\//, '');
        let content = embedded![filePath];
        if (!content) {
          const idxFallback = filePath + 'index.html';
          content = embedded![idxFallback];
        }
        if (!content) {
          content = embedded!['index.html'];
        }
        if (content) {
          const ext = path.extname(filePath) || '.html';
          const mime = mimeTypes[ext] || 'application/octet-stream';
          const buf = Buffer.from(content, 'base64');
          res.set('Content-Type', mime);
          res.set('Content-Length', String(buf.length));
          if (ext === '.html') {
            res.set('Cache-Control', 'no-cache');
          }
          res.send(buf);
        } else {
          res.status(404).send('Not found');
        }
      });
    } else {
      app.use(express.static(distPath));
      app.get('*all', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TypoMaster server running on http://localhost:${PORT}`);
    if (!hasApiKey) {
      console.log('  Running in offline mode: GEMINI_API_KEY not set. Using local tips.');
    }
  });
}

startServer();
