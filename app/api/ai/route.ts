import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { systemPrompt, userPrompt } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 2048,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: userPrompt },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Groq error:", data);
      return NextResponse.json({ error: data.error?.message || "AI error" }, { status: 500 });
    }

    const text = data.choices?.[0]?.message?.content;
    if (!text) return NextResponse.json({ error: "No response" }, { status: 500 });

    return NextResponse.json({ text });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
