function randEmail() {
  const n = Math.random().toString(36).slice(2, 8);
  return `user_${n}@example.com`;
}

async function ensureToken() {
  const existing = localStorage.getItem("token");
  if (existing) return existing;
  const base = import.meta.env.VITE_API_BASE || "/api";
  const r = await fetch(`${base}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: randEmail(), password: "Passw0rd!", name: "Demo User" }),
  });
  const j = await r.json();
  if (j.token) {
    localStorage.setItem("token", j.token);
    return j.token;
  }
  throw new Error("auth failed");
}

export async function aiSymptomCheck(text: string) {
  const t = await ensureToken();
  const base = import.meta.env.VITE_API_BASE || "/api";
  const r = await fetch(`${base}/ai/symptom-check`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
    body: JSON.stringify({ text }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error || "error");
  return j.result as string;
}
