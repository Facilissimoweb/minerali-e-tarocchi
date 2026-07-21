import dotenv from "dotenv";

dotenv.config();

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

export default async function handler(req: any, res: any) {
  console.log("Chat API Handler triggered. Method:", req.method);
  console.log("Request Content-Type:", req.headers?.["content-type"]);

  // Set CORS Headers to support multi-environment requests (including Vercel/localhost)
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  let body = req.body;

  // If req.body is empty or a readable stream, let's parse it manually to handle some serverless contexts
  if (!body && (req.readable || req.readableState?.readable)) {
    try {
      body = await new Promise((resolve, reject) => {
        let chunk = "";
        req.on("data", (data: any) => {
          chunk += data;
        });
        req.on("end", () => {
          resolve(chunk);
        });
        req.on("error", (err: any) => {
          reject(err);
        });
      });
      console.log("Raw body stream successfully read. Length:", body?.length);
    } catch (e: any) {
      console.error("Error reading body stream:", e);
    }
  }

  // Handle case where body is a Buffer
  if (body && typeof body === "object" && body.constructor && body.constructor.name === "Buffer") {
    body = body.toString("utf-8");
  }

  // Handle case where body is a string
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e: any) {
      console.warn("Body is string but could not be parsed as JSON:", e.message);
    }
  }

  console.log("Final processed body type:", typeof body);
  console.log("Final processed body keys:", body && typeof body === "object" ? Object.keys(body) : "none");

  try {
    const { message, history } = body || {};

    if (!message) {
      console.warn("Bad Request: 'message' is missing in the request body.");
      res.status(400).json({ 
        error: "Il messaggio è richiesto.",
        debug: {
          hasBody: !!body,
          bodyType: typeof body,
          bodyKeys: body && typeof body === "object" ? Object.keys(body) : []
        }
      });
      return;
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("Configuration Error: GROQ_API_KEY is not defined.");
      res.status(400).json({ 
        error: "GROQ_API_KEY non configurata su Vercel. Per favore, aggiungi la variabile d'ambiente GROQ_API_KEY nelle impostazioni del tuo progetto su Vercel (Project Settings -> Environment Variables) e ri-effettua il deployment." 
      });
      return;
    }

    // Prepare system instructions for Mineralosofia & Imaginal Psychology
    const systemInstruction = `Sei un esperto Mineralosofo, Cristallografo ed esperto di Psicologia Immaginale (ispirato a James Hillman, Henry Corbin e Selene Calloni Williams).
Il tuo obiettivo è guidare l'utente attraverso la "Mineralosofia": l'esplorazione dell'anima dei cristalli, dei loro legami con i 22 Arcani Maggiori e con il Sistema dei 7 Chakra.

Per ogni minerale o quesito dell'utente, considera sempre i tre fattori di incidenza che governano la disciplina:
1. Fattore Materiale (Chimico-Fisico): La chimica terrestre, la formula (es. SiO₂), la simmetria del reticolo (sistema cubico, trigonale, ecc.), la durezza Mohs e le proprietà fisiche come la piezoelettricità o i fenomeni ottici (adularescenza, asterismo).
2. Fattore Spirituale (Ideale-Archetipico): La forza astratta, l'ordine cosmico, la virtù spirituale e la legge d'armonia che l'Arcano e la pietra rappresentano.
3. Fattore Immaginale (Psico-Immaginale / Anima Mundi): La pietra non come oggetto inerte ma come "Daimon" vivente, specchio dell'anima e organo di percezione della psicologia immaginale. L'interazione con l'immagine mitica del cristallo, la contemplazione attiva e il corpo di sogno della Terra.

Inoltre, integra pienamente il Sistema dei 7 Chakra associato ad ogni Arcano e Minerale. Quando rispondi, spiega in che modo la pietra si connette al rispettivo Chakra:
- La Motivazione Archetipica sottesa al chakra.
- I Punti di Forza nello stato energetico armonico.
- I Punti di Debolezza, squilibri o blocchi energetici associati.
- Le Modalità di Equilibrio, reintegrazione e visualizzazione immaginale.

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
}
