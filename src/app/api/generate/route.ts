import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { game, topic } = await req.json();

    const prompt = `
You are a viral gaming content expert.

Create a YouTube Shorts script for:

Game: ${game}
Topic: ${topic}

Return in this exact format:

Title:
Hook:
Script:
Hashtags:

Rules:
- Title under 60 characters
- Hook must grab attention in 3 seconds
- Script: 15–30 seconds, high energy
- Hashtags: include trending gaming tags
`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const content = response.choices[0].message.content;

    return NextResponse.json({ content });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
  }
}
