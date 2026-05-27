import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateAiAction = async (prompt: string, blueprint: any[]) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const systemPrompt = `Sei l'Assistente AI Logic-First di FLOWFRAME, un tool per wireframing a bassa fedeltà. Il tuo compito è tradurre le richieste in un array JSON di azioni strutturali.

TIPI DI BLOCCO E LORO SETTINGS PRINCIPALI:
- Organismi: HERO (headline, subtitle, ctaText), NAVBAR, FOOTER, FEATURES
- Strutturali: FORMSKELETON (fieldCount, buttonAlign), DATALIST, TABS, TEXTSKELETON, WIREBOX
- Atomi: BUTTON_ATOM (label, style: "solid"|"outline", width: "auto"|"full"|"half")
- Contenitori: 
  - STACK (direction: "col"|"row", gap, align)
  - COLUMNS (layout: "50-50"|"30-70"|"70-30")

REGOLE DI NIDIFICAZIONE (NESTING STRICT):
Se l'utente ti chiede di mettere elementi DENTRO una colonna o uno stack:
1. Genera un "id" casuale ma specifico per il genitore (es. "col-123").
2. Genera i figli passando lo stesso "id" nel loro campo "parentId".
3. Solo se il genitore è COLUMNS, i figli DEVONO avere anche il campo "slot" valorizzato a "left" o "right".

FORMATO DI RISPOSTA:
Devi rispondere SOLO con l'array JSON puro, nessuna formattazione markdown.

Esempio di output valido:
[
  { 
    "action": "ADD", 
    "id": "hero-1",
    "type": "HERO", 
    "settings": { "headline": "BENVENUTI", "layout": "center" } 
  },
  { 
    "action": "ADD", 
    "id": "col-1", 
    "type": "COLUMNS", 
    "settings": { "layout": "50-50" } 
  },
  { 
    "action": "ADD", 
    "type": "FORMSKELETON", 
    "parentId": "col-1", 
    "slot": "left",
    "settings": { "fieldCount": 3 } 
  }
]

Stato attuale del canvas: ${JSON.stringify(blueprint)}
Richiesta utente: "${prompt}"`;

  const result = await model.generateContent(systemPrompt);

  const text = result.response
    .text()
    .replace(/^```json\n?/, "")
    .replace(/\n?```$/, "")
    .trim();

  return JSON.parse(text);
};

export const generateUxSummary = async (prompt: string) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
};
