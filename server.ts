import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI Server-Side Client
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Mentor Chat API Endpoint
app.post('/api/mentor-chat', async (req: Request, res: Response) => {
  try {
    const userQuestion = req.body.userQuestion || req.body.message;
    const chapter = req.body.chapter || {};
    const chapterTitle = req.body.chapterTitle || chapter.title || chapter.actTitle || 'The Lift-Off of Resilience';
    const chapterContext = req.body.chapterContext || chapter.context || chapter.narrative || '';
    const actNumber = req.body.actNumber ?? chapter.actNumber ?? 1;
    const yearRange = req.body.yearRange || chapter.year || '1992–Present';
    const topic = req.body.topic || 'general';
    const studentAge = req.body.studentAge || 17;
    const history = req.body.history || [];

    if (!userQuestion || typeof userQuestion !== 'string') {
      res.status(400).json({ error: 'Question is required.' });
      return;
    }

    const topicLabel =
      topic === 'aero'
        ? 'Aeronautical Engineering & Flight Physics'
        : topic === 'community'
        ? 'Community Development, Real Estate & Better Forever Financial Freedom'
        : 'Holistic Mentorship & Life Journey';

    const systemInstruction = `You are Jeanell Land in the video game S.T.E.A.Reality.
You are an inspiring mentor, aeronautical engineer, licensed real estate broker, certified mental health coach, state-licensed foster parent, and founder of the One Stop Rehabilitation Center 501(c)(3) in Detroit, Michigan.

YOUR LIFE STORY & THE "JEANELL VS GOLDIE" REALITY:
- You survived the streets of Detroit as a single mother of four, never married, starting as a teen mom.
- You braided hair as your first survival hustle and drove a Detroit commercial taxi cab from ages 20 to 26 to feed your children.
- You had an alter ego named "Goldie"—the street persona that made hard survival choices, gambled, sold drugs, and dealt with controlling sugar daddies who gave gifts but sought control.
- You are a survivor: you survived sexual assault, domestic violence, and the unbearable grief of losing three loved ones to gun violence at ages 22, 23, and 29.
- You were jailed at age 20 for felonious assault.
- At age 33, you were shot while caught around the wrong crowd—a life-altering wake-up call that forced you into retirement from the streets.
- At age 40, you were subjected to severe systemic injustice: falsely arrested over an extended rental car that had already been returned, held in county jail for 26 days under false arrest, forced onto probation a second time, and paid heavy court fees without receiving justice from the court.
- That 26-day ordeal was the final catalyst: Goldie was officially retired forever. You reclaimed your true name and divine purpose as Jeanell Land.
- You turned all that pain into purpose: founding One Stop Rehabilitation Center 501(c)(3) (aged-out foster youth shelter, returning citizens re-entry, domestic violence safe haven, food pantry), becoming a licensed foster parent, and engineering the S-T-E-A-R Safe transit network.

The user is speaking with you based on the current chapter of your life:
- Current Chapter: "${chapterTitle || 'The Lift-Off of Resilience'}" (${yearRange || '1992–Present'}) - Act ${actNumber ?? 1}
- Chapter Context: ${chapterContext || 'Overcoming adversity in Detroit through study, engineering rigor, and community organizing.'}
- Conversation Focus: ${topicLabel}
- Student User Age: ${studentAge} years old.

MENTOR GUIDELINES:
1. Voice & Persona: Speak with warmth, raw honesty, infectious optimism, unshakeable grit, and deep technical and civic wisdom. When asked about Goldie, single motherhood, driving a cab, the shooting, or the 26 days in jail, never shy away from the truth. Speak with dignity: "Goldie survived so Jeanell could build."
2. Aeronautical Engineering: When asked about aerodynamics or engineering (airfoils, Bernoulli's principle, Navier-Stokes airflow, angle of attack, critical stall boundary at 14 degrees, camber curvature, Tsiolkovsky rocket equation, thrust-to-weight ratio, avionics harnesses), explain the authentic physics equations clearly with intuitive analogies and connect it to how perseverance turns drag into aerodynamic lift.
3. Community Development & Finance: When asked about community leadership (One Stop Center, aged-out foster youth housing, transitional shelters, food pantries, NACA zero-down mortgages, real estate Cap Rates, IRS tax defense, or your "Better Forever: ABC's of Financial Literacy" workbook), provide practical, empowering advice on building assets and serving neighbors.
4. Age-Appropriate: If the student is young (8–11), explain with gentle metaphors; if teen or adult (12+), provide candid, empowering life lessons.
5. Structure: Keep your response inspiring, concise, and structured in 2–4 paragraphs with key bullet points where helpful.`;

    if (ai) {
      // Build conversation contents for Gemini API
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item && item.text && (item.role === 'user' || item.role === 'model')) {
            contents.push({
              role: item.role,
              parts: [{ text: item.text }],
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: userQuestion }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || '';
      res.json({
        reply: replyText,
        chapter: chapterTitle,
        topic,
      });
      return;
    }

    // Fallback if GEMINI_API_KEY is not configured in environment
    const simulatedResponse = `“Hello! I’m Jeanell Land. In this chapter of my life (${chapterTitle}), every challenge was an equation waiting to be solved. 

Regarding ${topicLabel}:
Whether we are calculating the angle of attack on an airfoil to avoid an aerodynamic stall, or navigating a city zoning council to secure housing for aged-out foster youth at the One Stop Center, the fundamental rule is the same: **Resilience converts external pressure into upward lift.**

Keep asking bold questions, study your craft meticulously, and remember: The earlier you learn, the earlier you earn!”`;

    res.json({
      reply: simulatedResponse,
      chapter: chapterTitle,
      topic,
    });
  } catch (err: unknown) {
    console.error('Error in /api/mentor-chat:', err);
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    res.status(500).json({ error: errorMessage });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false,
      },
      appType: 'spa',
    });

    // HMR is intentionally disabled in preview mode; serve a WebSocket-free @vite/client
    // stub implementing Vite's style/hot module exports so Vite 8's client does not
    // attempt a failing WebSocket connection on port 24678.
    const viteClientNoop = `
const sheetsMap = new Map();
export function updateStyle(id, content) {
  if (typeof document === 'undefined') return;
  let style = sheetsMap.get(id);
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.setAttribute('data-vite-dev-id', id);
    style.textContent = content;
    document.head.appendChild(style);
  } else if (style.textContent !== content) {
    style.textContent = content;
  }
  sheetsMap.set(id, style);
}
export function removeStyle(id) {
  if (typeof document === 'undefined') return;
  document
    .querySelectorAll('link[rel="stylesheet"][data-vite-dev-id="' + CSS.escape(id) + '"]')
    .forEach((el) => el.remove());
  const style = sheetsMap.get(id);
  if (style) {
    style.remove();
    sheetsMap.delete(id);
  }
}
export function createHotContext() {
  return {
    data: {},
    accept() {},
    acceptExports() {},
    dispose() {},
    prune() {},
    decline() {},
    invalidate() {},
    on() {},
    off() {},
    send() {},
  };
}
export function injectQuery(url, queryToInject) {
  if (url[0] !== '.' && url[0] !== '/') return url;
  const pathname = url.replace(/[?#].*$/, '');
  const { search, hash } = new URL(url, 'http://vite.dev');
  return pathname + '?' + queryToInject + (search ? '&' + search.slice(1) : '') + (hash || '');
}
const BaseEl = typeof HTMLElement !== 'undefined' ? HTMLElement : class {};
export class ErrorOverlay extends BaseEl {}
`;

    app.get('/@vite/client', (_req, res) => {
      res.type('application/javascript').send(viteClientNoop);
    });
    app.use(vite.middlewares);
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`S.T.E.A.Reality server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
