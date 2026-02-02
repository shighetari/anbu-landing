# Multimodel Voice Chatbot with Vercel **AI SDK v5** — My Playbook

> **Why this doc exists:** I use this file to guide my **Claude Code** and **Codex CLI** agents (and any teammate) when building and iterating on our demo chatbot that runs on our website’s landing page. It’s written as my notes in first‑person, but it’s meant to be followed by humans _and_ automation. Everything here is aligned with the **official AI SDK v5 docs** as of **Sep 19, 2025** and includes links for deeper reading.

---

## TL;DR (non‑technical overview)

- I ship one chat UI with **Next.js + Tailwind** on the frontend and a single **/api/chat** route on the backend.
- I call models through **AI SDK v5**. It gives me: streaming, tool‑calling, structured outputs, and easy **provider swapping** (OpenAI, xAI Grok, Google Gemini, Anthropic, Groq, etc.).
- For production control, I prefer to point models at **Vercel AI Gateway** (one endpoint across providers, with budgets, retries, analytics).
- For **voice** I use three layers:
  1. **Dictation (STT)** with AI SDK’s _experimental_ `transcribe()` API (e.g., Whisper).
  2. **Text‑to‑Speech** with AI SDK’s _experimental_ `generateSpeech()` API.
  3. **Live, interruptible voice conversations** via each provider’s **realtime** API (OpenAI Realtime; Gemini Live). I integrate those directly (WebRTC/WebSocket) and keep the rest of the app on AI SDK.
- For “thinking modes,” I use **reasoning parameters** (e.g., OpenAI `reasoningEffort`) and stream progress safely without exposing chain‑of‑thought.

**Official docs & key links**

- AI SDK (overview): https://ai-sdk.dev/docs/introduction
- AI SDK **useChat** (React hook): https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat
- Transport (custom headers/WebSockets): https://ai-sdk.dev/docs/ai-sdk-ui/transport
- `streamText` (server): https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text
- Structured output (`generateObject` / `streamObject`): https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object , https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-object
- Tools & tool‑calling: https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
- Providers list (incl. **@ai-sdk/xai**, **@ai-sdk/openai**, **@ai-sdk/google**, **@ai-sdk/anthropic**, **@ai-sdk/groq**): https://ai-sdk.dev/docs/foundations/providers-and-models
- **AI Gateway**: https://vercel.com/docs/ai-gateway (OpenAI‑compatible endpoint)
- Function max duration & Fluid Compute: https://vercel.com/docs/functions/configuring-functions/duration , https://vercel.com/docs/fluid-compute
- **Voice** (AI SDK): Speech (TTS) https://ai-sdk.dev/docs/ai-sdk-core/speech , Transcription (STT) https://ai-sdk.dev/docs/ai-sdk-core/transcription
- **Realtime voice** (providers): OpenAI Realtime https://openai.com/index/introducing-the-realtime-api/ , Gemini **Live API** https://ai.google.dev/gemini-api/docs/live (WebSocket)
- xAI / Grok API (OpenAI‑compatible): https://docs.x.ai/docs/api-reference

> Note: Speech + Transcription in the AI SDK are **experimental**. For fully live, low‑latency voice, I integrate **OpenAI Realtime** or **Gemini Live** directly.

---

## Architecture (how I wire it)

**Frontend (Next.js + Tailwind):** React hook `useChat` drives the UI with streaming updates. It posts to `/api/chat` via the default HTTP transport (SSE).  
**Backend (Next.js App Router):** `/api/chat` calls `streamText`, converts UI messages to model messages, registers **tools**, and streams a **UIMessage** protocol back.  
**Providers:** I use either…

- **AI Gateway default**: pass a `"provider/model"` string like `"openai/gpt-4o"` or `"google/gemini-2.5-flash"` and let Gateway handle keys/routing, **or**
- **Direct providers**: use `@ai-sdk/openai`, `@ai-sdk/google`, `@ai-sdk/xai`, etc., with provider‑specific keys.

**Voice path:**

- _Dictation_ (upload/stream audio → STT result) → **AI SDK `transcribe()`**.
- _TTS_ (text → audio) → **AI SDK `generateSpeech()`**.
- _Live voice chat_ (bi‑directional audio) → **OpenAI Realtime (WebRTC)** or **Gemini Live (WebSocket)** client‑side connection, with my UI managed by `useChat` for text/tooling when needed.

---

## Install

```bash
# core + react UI
pnpm add ai @ai-sdk/react zod

# providers I use (add or remove freely)
pnpm add @ai-sdk/openai @ai-sdk/google @ai-sdk/xai @ai-sdk/anthropic @ai-sdk/groq

# optional (Gateway model strings & default provider)
pnpm add @ai-sdk/gateway
```

- `useChat` (client) streams messages and now uses a **transport** architecture in v5.
- `streamText` / `generateObject` run on the server and normalize provider quirks.

---

## Environment setup (multi‑provider & Gateway)

### Option A — **AI Gateway first** (recommended for production)

1. Create an **AI Gateway** project. Add my vendor keys (**BYOK**) for OpenAI, Google, xAI, Anthropic, etc.
2. Set `AI_GATEWAY_API_KEY` in Vercel Project → Settings → Environment Variables.
3. In code, I pass models as **strings**: `"openai/gpt-4o"`, `"google/gemini-2.5-flash"`, `"xai/grok-4"`, `"anthropic/claude-3-7-sonnet-20250219"`, `"groq/llama-3.3-70b-versatile"`. The AI SDK’s **global provider** resolves these to Gateway by default.

Optionally, I can make the default explicit in an initialization file (e.g., `instrumentation.ts`):

```ts
// instrumentation.ts
import { createGateway } from '@ai-sdk/gateway';

// Configure via env; override baseURL/apiKey if needed.
globalThis.AI_SDK_DEFAULT_PROVIDER = createGateway({});
```

### Option B — **Direct provider keys** (no Gateway)

- `OPENAI_API_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`, `XAI_API_KEY`, `ANTHROPIC_API_KEY`, `GROQ_API_KEY`, etc.
- In code, call the provider: `openai('gpt-4o')`, `google('gemini-2.5-flash')`, `xai('grok-4')`, etc.

> I never expose secrets to the client: only `NEXT_PUBLIC_*` is publicly readable in the browser.

---

## Minimal UI (Next.js + Tailwind)

```tsx
// app/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Page() {
  const { messages, sendMessage, status, stop, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  const [input, setInput] = useState('');

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Demo Chat</h1>

      <div className="mb-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={m.role === 'user' ? 'text-right' : ''}>
            <div
              className={
                'inline-block rounded-lg px-3 py-2 ' +
                (m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900')
              }
            >
              {m.parts.map((p, i) => (p.type === 'text' ? <span key={i}>{p.text}</span> : null))}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
        className="flex gap-2"
      >
        <input
          className="flex-1 rounded border px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Ask me anything…"
        />
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          disabled={status !== 'ready'}
        >
          Send
        </button>
        <button
          type="button"
          onClick={() => stop()}
          className="rounded border px-3 py-2"
          disabled={!(status === 'submitted' || status === 'streaming')}
        >
          Stop
        </button>
        <button
          type="button"
          onClick={() => regenerate()}
          className="rounded border px-3 py-2"
          disabled={status !== 'ready'}
        >
          Regenerate
        </button>
      </form>
    </main>
  );
}
```

- `useChat` uses **DefaultChatTransport** to POST to `/api/chat` with an SSE stream back. I can later swap to a custom transport if I need custom auth or WebSockets.

---

## Backend route (`/api/chat`) with tools + streaming

```ts
// app/api/chat/route.ts
import { streamText, convertToModelMessages, UIMessage, tool } from 'ai';
import { z } from 'zod';

// Choose ONE of these patterns:

// A) Gateway-backed string model (recommended):
const MODEL = 'openai/gpt-4o';

// B) Direct provider (no Gateway):
// import { openai } from '@ai-sdk/openai';
// const MODEL = openai('gpt-4o');

export const maxDuration = 30; // increase for longer answers or move this route to Fluid Compute

// Example tool the model can call:
const searchDocs = tool({
  description: 'Search internal docs',
  inputSchema: z.object({ q: z.string() }),
  async execute({ q }) {
    // TODO: call my search index
    return [{ title: `Result for "${q}"`, url: '/docs/start' }];
  },
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: MODEL,
    system: 'You are a helpful assistant for visitors on our site.',
    messages: convertToModelMessages(messages),
    tools: { searchDocs },
    // stopWhen / prepareStep for multi-step agents (see "Agents & thinking modes" below)
  });

  return result.toUIMessageStreamResponse();
}
```

- The UI sends **UI messages**; I convert them to **model messages** before calling `streamText`.
- The response returns a **UIMessage** stream that the client hook understands (including tool calls/results).

---

## Provider selection & model registry

I keep a tiny registry so the UI can switch providers and models via dropdown without touching server code:

```ts
// lib/ai/models.ts
export const MODEL_OPTIONS = [
  { label: 'OpenAI — GPT‑4o (general)', value: 'openai/gpt-4o' },
  { label: 'OpenAI — o4‑mini (reasoning)', value: 'openai/o4-mini' },
  { label: 'xAI — Grok‑4 (general)', value: 'xai/grok-4' },
  { label: 'Google — Gemini 2.5 Flash (general)', value: 'google/gemini-2.5-flash' },
  {
    label: 'Anthropic — Claude 3.7 Sonnet (general)',
    value: 'anthropic/claude-3-7-sonnet-20250219',
  },
  { label: 'Groq — Llama 3.3 70B (fast)', value: 'groq/llama-3.3-70b-versatile' },
];
```

Then I pass the selected value to the API (e.g., in `body`), and use it in `streamText({ model })`.

> **Tip:** With AI Gateway I add/remove providers by toggling keys in the Gateway UI; the app keeps using `"provider/model"` strings.

---

## Voice features

### 1) Dictation (Speech‑to‑Text / STT)

```ts
// Node/Server example (batch) — experimental API
import { experimental_transcribe as transcribe } from 'ai';
import { openai } from '@ai-sdk/openai';
import { readFile } from 'fs/promises';

const transcript = await transcribe({
  model: openai.transcription('whisper-1'),
  audio: await readFile('audio.mp3'),
});

console.log(transcript.text);
```

- For browser streaming STT, I capture the mic, chunk/encode audio, and POST to an API route that forwards to the transcription model. For low‑latency, I may prefer **Gemini Live** (below) which supports streaming audio.

### 2) Text‑to‑Speech (TTS)

```ts
// Node/Server example — experimental API
import { experimental_generateSpeech as generateSpeech } from 'ai';
import { openai } from '@ai-sdk/openai';

const { audio } = await generateSpeech({
  model: openai.speech('tts-1'),
  text: 'Welcome to our site! Ask me anything.',
  voice: 'alloy',
});

// write audio to file / stream to client
```

- In the browser I can fetch a TTS endpoint that returns audio and play it via the Web Audio API.
- Both **`transcribe`** and **`generateSpeech`** are marked **experimental** in the AI SDK.

### 3) **Live streaming conversation (interruptible, full‑duplex)**

This is where I step _outside_ the AI SDK’s HTTP flow and use each provider’s realtime stack:

- **OpenAI Realtime API (WebRTC or WebSocket):** I open a Realtime session from the browser, stream mic audio in, and receive generated audio out with **barge‑in/interrupt** support.
  - Docs: https://openai.com/index/introducing-the-realtime-api/
- **Google Gemini Live API (WebSocket):** similar concept; I connect via WebSocket, stream audio chunks (PCM), and play output as it arrives.
  - Docs: https://ai.google.dev/gemini-api/docs/live and API ref https://ai.google.dev/api/live

**How I unify this in our app**

- I keep the **voice session** (WebRTC/WebSocket) in a separate client module and expose simple callbacks (`onPartialText`, `onFinalText`, `onAudio`) to my React UI.
- I still use **AI SDK** for **tools**, **RAG**, or **structured outputs** when I need text mode—e.g., pipe the live transcript into `/api/chat` via `useChat` to call tools and render UI.
- If I need to stream intermediate values back to the UI (e.g., tool progress) I use **AI SDK RSC `createStreamableValue`** or **UI streaming helpers** on the server.

> For production demos, I usually wire **live voice** using the provider SDK/documentation, and keep the rest of the stack on AI SDK + Gateway.

---

## “Thinking” / reasoning modes & streaming responsibly

- **OpenAI reasoning:** When I’m on o‑series models (o1, o3, o4‑mini), I pass `providerOptions.openai.reasoningEffort` (e.g., `'low' | 'medium' | 'high'`). I can also enable **reasoning summaries** in the stream (safe, condensed).

```ts
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

const result = streamText({
  model: openai('o4-mini'),
  messages: [{ role: 'user', content: 'Outline a robust, minimal web crawler architecture.' }],
  providerOptions: {
    openai: {
      reasoningEffort: 'medium',
      reasoningSummary: 'auto', // shows safe reasoning summaries in stream
    },
  },
  // stopWhen: stepCountIs(4) — optional loop control while using tools
});
```

- **xAI Grok:** The xAI API is **OpenAI‑compatible** for basic usage. As of now, `reasoning_effort` is **not** supported on `grok-4`; I avoid sending it there.
- **Gemini:** I use Live for voice; for text, standard `streamText` calls via `@ai-sdk/google`. No “thinking mode” flag—treat like high‑quality general model.

> **Rule:** I never ask models to dump chain‑of‑thought. I rely on validated structured outputs, logs, and (where supported) **reasoning summaries** rather than raw inner monologue.

---

## Agents (multi‑step tools) in v5

AI SDK v5 gives me **loop control** without external frameworks:

```ts
import { streamText, stepCountIs } from 'ai';
import { z } from 'zod';
import { tool } from 'ai';

const fetchIssue = tool({
  description: 'Fetch issue by id',
  inputSchema: z.object({ id: z.string() }),
  async execute({ id }) {
    // call my API
    return { id, title: 'Example', status: 'open' };
  },
});

const result = streamText({
  model: 'openai/gpt-4o',
  messages: [{ role: 'user', content: 'Is issue 42 closed? If not, summarize it.' }],
  tools: { fetchIssue },
  // iterate agent steps up to 3 tool hops
  stopWhen: stepCountIs(3),
});
```

- I use `stopWhen`/`prepareStep` to bound costs and switch tools/models mid‑loop if needed.
- Steps and tool‑events are visible on `result.fullStream` for telemetry and UI.

---

## Persistence, auth, telemetry

- **Persist messages** (server‑side) at the end of each response; the AI SDK has a guide for `useChat` persistence. Store only the recent N messages to control prompt length.
- **Auth**: carry a session id in `useChat({ transport: new DefaultChatTransport({ headers: ... body: ... }) })`.
- **Budgets & rate limits**: put traffic behind **AI Gateway** to set per‑model/team budgets, retries, and analytics.
- **Function duration**: raise `export const maxDuration` on routes that stream long messages, or move to **Fluid Compute** for longer sessions.

---

## CLI usage (for my Claude Code / Codex CLI agents)

I maintain a small Node CLI that mirrors the server route and supports model selection at runtime. This lets agents and humans test flows outside the browser.

```ts
// cli/chat.ts
#!/usr/bin/env ts-node

import { generateText } from 'ai';

// Using the Gateway-backed global provider with "provider/model" strings:
const modelId = process.argv[2] || 'openai/gpt-4o';
const prompt = process.argv.slice(3).join(' ') || 'Say hello.';

(async () => {
  const { text } = await generateText({ model: modelId, prompt });
  console.log(text);
})();
```

Add STT → text or TTS steps as needed by calling the experimental `transcribe()` / `generateSpeech()` in batch mode. For live voice in a CLI, I’d use provider‑specific streaming SDKs (WebSocket/WebRTC).

---

## Security & best practices I always follow

- **Never** ship provider keys to the browser; route calls through the server (or Gateway).
- Use **structured outputs** (`generateObject` / `streamObject`) for critical flows.
- Validate **tool inputs** with Zod schemas; treat every tool execution as untrusted.
- Log usage (via Gateway) and enforce **max steps / durations** on agent flows.
- For voice, get user consent for mic and mention data handling in the privacy policy.

---

## Appendix A — Model cheat‑sheet (examples)

> These are stable _examples_ I often use; always verify latest names in provider docs or via Gateway.

- **OpenAI**: `openai/gpt-4o`, `openai/o4-mini` (reasoning)
- **xAI (Grok)**: `xai/grok-4`
- **Google**: `google/gemini-2.5-flash`
- **Anthropic**: `anthropic/claude-3-7-sonnet-20250219`
- **Groq**: `groq/llama-3.3-70b-versatile`

---

## Appendix B — Quick links (docs I check often)

- AI SDK intro: https://ai-sdk.dev/docs/introduction
- useChat: https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat
- Transport & headers: https://ai-sdk.dev/docs/ai-sdk-ui/transport
- Stream protocols (UIMessage): https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol
- Generating text / streaming: https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text
- Structured outputs: https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object
- Tools & tool‑calling: https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
- Providers list (incl. **@ai-sdk/xai**): https://ai-sdk.dev/docs/foundations/providers-and-models
- AI Gateway (OpenAI‑compatible): https://vercel.com/docs/ai-gateway
- Function duration & Fluid Compute: https://vercel.com/docs/functions/configuring-functions/duration , https://vercel.com/docs/fluid-compute
- Voice (AI SDK): Speech https://ai-sdk.dev/docs/ai-sdk-core/speech , Transcription https://ai-sdk.dev/docs/ai-sdk-core/transcription
- Realtime voice: OpenAI Realtime https://openai.com/index/introducing-the-realtime-api/ , Gemini Live https://ai.google.dev/gemini-api/docs/live
- xAI Grok API: https://docs.x.ai/docs/api-reference

---

## Changelog awareness (v5 items I rely on)

- **Transport‑based** `useChat`; I pass headers/body and can swap the network layer.
- Server returns `result.toUIMessageStreamResponse()` (UIMessage protocol).
- **Tools** use `inputSchema` (and optional `outputSchema`) and support multi‑step loops with `stopWhen`.
- Reasoning support with **`reasoningEffort`** and **reasoning summaries** on OpenAI models.
