export async function POST(req: Request) {
  try {
    const { decision } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a decision-making assistant. Be clear, structured, and practical.",
          },
          {
            role: "user",
            content: `Analyze this decision:

"${decision}"

Return:

1. Core tradeoff
2. Pros
3. Cons
4. Emotional factors
5. Logical factors
6. Recommended next step`,
          },
        ],
      }),
    });

    const text = await response.text();
    console.log("RAW OPENAI RESPONSE:", text);

    const data = JSON.parse(text);

    return Response.json({
      result: data.choices?.[0]?.message?.content || "No response generated.",
    });

  } catch (err) {
    console.error("API ERROR:", err);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}