// =========================================================
// generate-demo.mjs – Netlify Function (Node.js ESM)
// Palotai Dániel AI Oktatói Portfólió
//
// Felelős:
//   1. Appwrite JWT validáció  
//   2. LLM API hívás (OpenAI GPT-4o vagy Claude)
//   3. Strukturált JSON visszaadása a frontendnek
//
// ENV változók (Netlify dashboardon beállítandó):
//   LLM_PROVIDER      = "openai" | "claude"
//   LLM_MODEL         = "gpt-4o" | "claude-3-5-sonnet-20241022"
//   LLM_API_KEY       = sk-... vagy sk-ant-...
//   APPWRITE_ENDPOINT = https://cloud.appwrite.io/v1
//   APPWRITE_PROJECT_ID = xxx
//   APPWRITE_API_KEY  = x-appwrite-key értéke (server-side only)
// =========================================================

const MAX_RETRIES = 2;
const LLM_TIMEOUT_MS = 20_000;

// Témánkénti prompt engineering
const TOPIC_PROMPTS = {
    curriculum: `
Te egy tapasztalt pedagógiai tervező és AI specialista vagy. 
A feladat: Tervezz egy 90 perces, AI-asszisztált workshopot "Produktív workflow-k AI-val" témában felnőttképzési környezetben.

Adj vissza egy KONKRÉT, azonnal alkalmazható tervet az alábbi formában:
## Workshop Terv: AI-asszisztált Produktivitás

### A workshop ívének 5 lépése
[5 lépés, időtartammal]

### Kulcs AI-eszközök és promptok
[3 konkrét eszköz és minta-prompt]

### Várható résztvevői eredmények
[3 mérhető eredmény]

Legyen praktikus, ne elméleti. Magyar felnőtt szakembereknek szól.
`,

    'prompt-design': `
Te egy prompt engineering szakértő vagy, aki felnőttképzési trénereketoktatja.
A feladat: Adj 5 db azonnal használható, erős prompt sablont trénereknek.

Adj vissza az alábbi formátumban:
## 5 Erős Prompt Sablon Trénereknek

### 1. [Sablon neve]
**Használat:** [mikor alkalmazzuk]
**Prompt:** "[maga a prompt sablon]"
**Várható output:** [mit ad vissza az AI]

[folytasd 2-5-ig]

Legyen konkrét, másolható. Magyar oktatási kontextus.
`,

    'personal-learning': `
Te egy adaptív tanulástervezési szakértő és AI konzultáns vagy.
A feladat: Mutasd be, hogyan lehet AI-val személyre szabott tanulási útvonalat tervezni egy vállalati képzésben.

Adj vissza az alábbi formában:
## Személyre Szabott Tanulás AI-val – Lépésről Lépésre

### Az alapdiagnózis (10 perc)
[3 kérdés, amit az AI segítségével megválaszolunk]

### Az adaptív útvonal 3 szintje
[Kezdő / Haladó / Szakértő – AI-alapú szint-meghatározás]

### Visszajelzési loop
[Hogyan tanul maga az útvonal a résztvevőből?]

### Eszközök és integráció
[2 konkrét eszköz, ami ezt lehetővé teszi]

Magyar felnőttképzési kontextus, azonnal alkalmazható.
`,
};

// LLM API hívás retry logikával
async function callLLMWithRetry(topicId, retries = 0) {
    const provider = process.env.LLM_PROVIDER || 'openai';
    const model = process.env.LLM_MODEL || 'gpt-4o';
    const apiKey = process.env.LLM_API_KEY;

    if (!apiKey) throw new Error('LLM_API_KEY nincs beállítva');

    const prompt = TOPIC_PROMPTS[topicId] || TOPIC_PROMPTS['curriculum'];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), LLM_TIMEOUT_MS);

    try {
        let response;

        if (provider === 'openai') {
            response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model,
                    messages: [
                        {
                            role: 'system',
                            content: 'Precíz, gyakorlatorientált AI oktatási szakértő vagy. Mindig strukturált, markdown-formátumú választ adsz. Mindig magyarul válaszolsz.',
                        },
                        { role: 'user', content: prompt.trim() },
                    ],
                    max_tokens: 1200,
                    temperature: 0.7,
                }),
                signal: controller.signal,
            });

            if (!response.ok) {
                const errBody = await response.text();
                throw new Error(`OpenAI API hiba ${response.status}: ${errBody}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;

        } else if (provider === 'claude') {
            response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01',
                },
                body: JSON.stringify({
                    model,
                    max_tokens: 1200,
                    system: 'Precíz, gyakorlatorientált AI oktatási szakértő vagy. Mindig strukturált, markdown-formátumú választ adsz. Mindig magyarul válaszolsz.',
                    messages: [{ role: 'user', content: prompt.trim() }],
                }),
                signal: controller.signal,
            });

            if (!response.ok) {
                const errBody = await response.text();
                throw new Error(`Claude API hiba ${response.status}: ${errBody}`);
            }

            const data = await response.json();
            return data.content[0].text;
        }

        throw new Error(`Ismeretlen LLM provider: ${provider}`);

    } catch (err) {
        clearTimeout(timeout);
        if (err.name === 'AbortError') {
            if (retries < MAX_RETRIES) {
                console.warn(`[generate-demo] LLM timeout, retry ${retries + 1}/${MAX_RETRIES}`);
                return callLLMWithRetry(topicId, retries + 1);
            }
            throw new Error('LLM_TIMEOUT');
        }
        throw err;
    } finally {
        clearTimeout(timeout);
    }
}

// Appwrite JWT validáció (egyszerűsített – a JWT-t az Appwrite adta ki)
async function validateAppwriteJWT(jwt) {
    const endpoint = process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
    const projectId = process.env.APPWRITE_PROJECT_ID;
    const apiKey = process.env.APPWRITE_API_KEY;

    if (!projectId || !apiKey) {
        console.warn('[generate-demo] Appwrite config hiányzik – JWT validáció kihagyva (dev mode)');
        return true; // fejlesztéshez; productionban false-ra kell állítani!
    }

    try {
        const response = await fetch(`${endpoint}/account`, {
            headers: {
                'X-Appwrite-Project': projectId,
                'X-Appwrite-JWT': jwt,
                'Content-Type': 'application/json',
            },
        });
        return response.ok;
    } catch {
        return false;
    }
}

// Netlify Function handler
export const handler = async (event) => {
    // CORS headers
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    // JWT validáció
    const authHeader = event.headers?.authorization || '';
    const jwt = authHeader.replace('Bearer ', '').trim();

    if (!jwt) {
        return { statusCode: 401, headers, body: JSON.stringify({ error: 'Hiányzó Authorization token.' }) };
    }

    const isValid = await validateAppwriteJWT(jwt);
    if (!isValid) {
        return { statusCode: 401, headers, body: JSON.stringify({ error: 'Érvénytelen session. Kérjük, lépj be újra.' }) };
    }

    // Request body parse
    let topicId;
    try {
        const body = JSON.parse(event.body || '{}');
        topicId = body.topicId || 'curriculum';
    } catch {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Érvénytelen kérés formátum.' }) };
    }

    if (!TOPIC_PROMPTS[topicId]) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: `Ismeretlen téma: ${topicId}` }) };
    }

    // LLM hívás
    try {
        const content = await callLLMWithRetry(topicId);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ content, topicId }),
        };
    } catch (err) {
        console.error('[generate-demo] LLM hiba:', err.message);

        if (err.message === 'LLM_TIMEOUT') {
            return { statusCode: 504, headers, body: JSON.stringify({ error: 'Az AI most túlterhelt. Kérjük, próbáld újra egy perc múlva.' }) };
        }
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Szerver oldali hiba. Kérjük, próbáld újra.' }) };
    }
};
