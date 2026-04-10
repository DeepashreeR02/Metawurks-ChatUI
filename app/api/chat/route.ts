import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  await new Promise((res) => setTimeout(res, 1500));

  const responses = [
    `You said: ${message}`,
    `Interesting! Tell me more about "${message}"`,
    `I understand: ${message}`,
  ];

  const reply = responses[Math.floor(Math.random() * responses.length)];

  return NextResponse.json({ reply });
}