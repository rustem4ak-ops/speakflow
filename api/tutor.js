export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const level = String(body.level || "A1");
    const goal = String(body.goal || "conversation");
    const scenario = String(body.scenario || "conversation");
    const turn = String(body.turn || "");
    const userText = String(body.userText || "").trim();
    const messages = Array.isArray(body.messages) ? body.messages.slice(-8) : [];
    if (!userText) return res.status(400).json({ error: "userText is required" });
    const instructions = [
      "You are SpeakFlow AI Tutor, an English speaking coach.",
      "Speak naturally like a friendly native English conversation partner.",
      "The learner is practicing English. Their level is " + level + ".",
      "Their goal is " + goal + ". The current scenario is " + scenario + ".",
      "Keep your reply short and conversational: normally 1-2 sentences.",
      "Always continue the role-play instead of ending the conversation.",
      "Correct only the most useful mistake. If the learner is already natural, say so briefly.",
      "Never shame the learner. Encourage them.",
      "Return ONLY valid JSON with exactly these keys: reply, correction, score, suggestion.",
      "reply = next natural English dialogue line.",
      "correction = short Russian explanation of the most useful correction, or empty string.",
      "score = integer 0-100 for clarity/naturalness at the learner level.",
      "suggestion = one natural English alternative, or empty string."
    ].join("\n");
    const input = messages.map(function(m) { return { role: m.role === "assistant" ? "assistant" : "user", content: String(m.content || "") }; });
    input.push({ role: "user", content: "Current tutor turn: " + turn + "\nLearner answer: " + userText });
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + apiKey },
      body: JSON.stringify({ model: "gpt-5.6-luna", instructions: instructions, input: input, max_output_tokens: 250 })
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data && data.error ? data.error.message || "OpenAI request failed" : "OpenAI request failed" });
    let text = typeof data.output_text === "string" ? data.output_text : "";
    if (!text && Array.isArray(data.output)) {
      data.output.forEach(function(item) {
        if (!Array.isArray(item.content)) return;
        item.content.forEach(function(part) { if (typeof part.text === "string") text += part.text; });
      });
    }
    text = text.trim().replace(/^```json\s*/i, "").replace(/\s*```$/i, "");
    let result;
    try { result = JSON.parse(text); } catch (e) { result = { reply: text || "Tell me a little more.", correction: "", score: 75, suggestion: "" }; }
    return res.status(200).json({ reply: String(result.reply || "Tell me a little more."), correction: String(result.correction || ""), score: Math.max(0, Math.min(100, Number(result.score) || 0)), suggestion: String(result.suggestion || "") });
  } catch (error) { return res.status(500).json({ error: "Tutor server error" }); }
}