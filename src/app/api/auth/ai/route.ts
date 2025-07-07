// /app/api/ideas/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { topic } = await req.json();

  const prompt = `Suggest 5 creative blog post ideas about: ${topic}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4", // or gpt-3.5-turbo
      messages: [
        { role: "system", content: "You are a helpful blog writing assistant." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  return NextResponse.json({ ideas: data.choices[0].message.content });
}
