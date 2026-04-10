# Metawurks AI — Chat UI

A clean, responsive AI chat interface built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. The UI features a polished chat window with dark/light mode, animated typing indicators, Markdown rendering, and a simulated AI backend.

---

## Features

- **Conversational Chat Interface** — User and assistant messages in a scrollable chat window with timestamps
- **Dark / Light Mode** — Toggle between themes at any time; input and message bubbles adapt automatically
- **Markdown Rendering** — Assistant responses are rendered as rich Markdown via `react-markdown`
- **Typing Indicator** — Animated three-dot bounce while the assistant is "thinking"
- **Copy to Clipboard** — Each message has a one-click copy button
- **Auto-scroll** — Chat window automatically scrolls to the latest message
- **Notification Sound** — An audio cue plays on each new assistant message
- **Clear Chat** — Wipe the conversation history with a single button
- **Keyboard Support** — Press `Enter` to send a message
- **Responsive Design** — Fully mobile-friendly layout with adaptive padding and font sizes

---

## Tech Stack

| Layer         | Technology |
| Framework     | Next.js 16 (App Router) |
| UI Library    | React 19 |
| Styling       | Tailwind CSS v4 |
| Markdown      | react-markdown ^10 |
| Language      | TypeScript 5 |
| Fonts         | Geist Sans & Geist Mono (Google Fonts) |
| Build Tool    | Turbopack (via Next.js dev server) |

---

## Project Structure

```
chat-ui/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # POST /api/chat — simulated AI backend
│   ├── globals.css             # Global Tailwind styles
│   ├── layout.tsx              # Root layout with font setup and metadata
│   └── page.tsx                # Root page — renders <ChatWindow />
├── components/
│   ├── ChatWindow.tsx          # Main chat container — state, send logic, layout
│   ├── InputArea.tsx           # Text input + Send button
│   └── Message.tsx             # Individual message bubble with Markdown + copy
├── public/
│   └── notification.mp3        # Audio played on new assistant message
├── package.json
├── next.config.ts
├── tsconfig.json
└── tailwind.config (via PostCSS)
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

```bash
# Clone or extract the project
cd chat-ui

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## API Route

**`POST /api/chat`**

Accepts a JSON body and returns a simulated assistant reply after a 1.5-second delay.

**Request:**
```json
{ "message": "Hello!" }
```

**Response:**
```json
{ "reply": "You said: Hello!" }
```

The mock backend randomly picks from three response templates. Replace this with a real LLM call (e.g. Anthropic, OpenAI) to make the chat functional.

---

## Connecting a Real AI Backend

To connect a real LLM, replace the body of `app/api/chat/route.ts`:

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: message }],
  });

  const reply = response.content[0].type === "text"
    ? response.content[0].text
    : "No response.";

  return NextResponse.json({ reply });
}
```

Then add your API key to `.env.local`:

```
ANTHROPIC_API_KEY=your_key_here
```

---

## Customisation

### App Title & Branding

Edit the heading in `components/ChatWindow.tsx`:

```tsx
<h1 className="text-lg sm:text-xl font-semibold">Your App Name</h1>
```

Update the page metadata in `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your description",
};
```

### Colours & Theming

The project uses Tailwind utility classes. Edit the `darkMode`-conditional classNames inside `ChatWindow.tsx`, `InputArea.tsx`, and `Message.tsx` to change the colour scheme.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## License

Private project — all rights reserved.