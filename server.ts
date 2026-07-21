import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization helper for GoogleGenAI to prevent crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in the secrets or environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Helper to call Groq API directly via native fetch
async function callGroqChat(messages: any[], apiKey: string) {
  const models = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"];
  let lastError: any = null;

  for (const model of models) {
    try {
      console.log(`Trying Groq model: ${model}`);
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 2048
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq responded with status ${response.status}: ${errorText}`);
      }

      const data: any = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (content) {
        return content;
      }
      throw new Error("Empty response content from Groq API");
    } catch (err: any) {
      console.warn(`Failed with Groq model ${model}:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to call Groq API with any model.");
}

// API routes FIRST
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      res.status(400).json({ error: "Il messaggio è richiesto." });
      return;
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      res.status(400).json({ 
        error: "GROQ_API_KEY non configurata. Per favore inserisci la tua chiave API di Groq nelle impostazioni (Secrets)." 
      });
      return;
    }

    // Prepare system instructions for Mineralosofia & Imaginal Psychology
    const systemInstruction = `Sei un esperto Mineralosofo, Cristallografo ed esperto di Psicologia Immaginale (ispirato a James Hillman, Henry Corbin e Selene Calloni Williams).
Il tuo obiettivo è guidare l'utente attraverso la "Mineralosofia": l'esplorazione dell'anima dei cristalli e dei loro legami con i 22 Arcani Maggiori.

Per ogni minerale o quesito dell'utente, considera sempre i tre fattori di incidenza che governano la disciplina:
1. Fattore Materiale (Chimico-Fisico): La chimica terrestre, la formula (es. SiO₂), la simmetria del reticolo (sistema cubico, trigonale, ecc.), la durezza Mohs e le proprietà fisiche come la piezoelettricità o i fenomeni ottici (adularescenza, asterismo).
2. Fattore Spirituale (Ideale-Archetipico): La forza astratta, l'ordine cosmico, la virtù spirituale e la legge d'armonia che l'Arcano e la pietra rappresentano.
3. Fattore Immaginale (Psico-Immaginale / Anima Mundi): La pietra non come oggetto inerte ma come "Daimon" vivente, specchio dell'anima e organo di percezione della psicologia immaginale. L'interazione con l'immagine mitica del cristallo, la contemplazione attiva e il corpo di sogno della Terra.

Parla in lingua italiana. Mantieni un tono colto, ricco, ispirante, ma scientificamente rigoroso e profondo. Non usare tecnicismi vuoti o diciture esoteriche superficiali (niente "energia curativa magica generica"), mantieni invece il focus sulla corrispondenza tra la fisica del cristallo (es. la fluorite che si sfalda lungo l'ottaedro perfetto) e la dinamica psichica (la Giustizia che discerne ed equilibra).`;

    // Map history to standard OpenAI/Groq format
    const messages = [
      { role: "system", content: systemInstruction }
    ];

    if (history && Array.isArray(history)) {
      for (const turn of history) {
        const role = turn.role === "model" ? "assistant" : "user";
        const content = turn.parts?.[0]?.text || "";
        if (content) {
          messages.push({ role, content });
        }
      }
    }

    // Add current user message
    messages.push({ role: "user", content: message });

    const reply = await callGroqChat(messages, apiKey);
    res.json({ text: reply });
  } catch (error: any) {
    console.error("Errore nella chiamata a Groq:", error);
    res.status(500).json({ 
      error: error.message || "Si è verificato un errore durante la generazione della risposta con Groq." 
    });
  }
});

// Vite middleware setup for asset and script serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start server with Vite:", err);
  process.exit(1);
});
