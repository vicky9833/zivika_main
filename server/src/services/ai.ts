import { LRUCache } from "lru-cache";

const models = [
  "llama-3.1-70b-instruct",
  "llama-3.1-8b-instruct",
  "mixtral-8x7b-instruct",
  "gemma-7b-it",
  "llama3-70b-8192"
];

const cache = new LRUCache<string, string>({ max: 500, ttl: 1000 * 60 * 5 });

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

function heuristicTriage(input: string) {
  const t = input.toLowerCase();
  const adv: string[] = [];
  if (t.includes("fever")) adv.push("Monitor temperature every 4–6 hours");
  if (t.includes("cough")) adv.push("Stay hydrated and avoid cold air");
  if (t.includes("headache")) adv.push("Rest in a quiet room and hydrate");
  if (t.includes("stomach")) adv.push("Eat light foods, avoid irritants");
  const base = adv.length ? adv.join("\n") : "Hydrate, rest, and monitor symptoms";
  return `${base}\nIf symptoms persist or worsen, consult a physician.`;
}

async function callGroq(messages: ChatMessage[]) {
  if (!process.env.GROQ_API_KEY) {
    const u = messages.find(m => m.role === "user")?.content || "";
    return heuristicTriage(u);
  }
  const inputKey = JSON.stringify(messages);
  const cached = cache.get(inputKey);
  if (cached) return cached;
  let lastError: unknown;
  const controller = new AbortController();
  const signal = controller.signal;
  const calls = models.map(async (m) => {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: m,
        messages,
        temperature: 0.2,
      }),
      signal
    });
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const json = await res.json();
    const text = json.choices?.[0]?.message?.content || "";
    return text;
  });
  try {
    const text = await Promise.any(calls);
    cache.set(inputKey, text);
    controller.abort();
    return text;
  } catch (e: unknown) {
    lastError = e;
    throw Object.assign(new Error("Groq call failed"), { status: 502, cause: lastError });
  }
}

export async function analyzeSymptoms(input: string) {
  const prompt: ChatMessage[] = [
    { role: "system", content: "You are a medical triage assistant. Respond with concise guidance and disclaimers." },
    { role: "user", content: input }
  ];
  const text = await callGroq(prompt);
  return { result: text };
}

export async function extractFeatures(input: string) {
  const prompt: ChatMessage[] = [
    { role: "system", content: "Extract structured clinical features as JSON with keys: symptoms, duration, severity, possible_conditions." },
    { role: "user", content: input }
  ];
  const text = await callGroq(prompt);
  return { result: text };
}
