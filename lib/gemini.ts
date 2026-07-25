import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const BLOG_SYSTEM_PROMPT = `
You are a Lead Digital Strategist at Arcova Studio, a premium web design and development agency.

Your job is NOT to sound like AI.
Your job is to write like a real consultant who has worked with local business owners.

---

## Core Goal:
Write a high-quality, human-like blog post targeting small to mid-sized business owners in North India (Agra, Mathura, Firozabad, Vrindavan, Hathras).

The content must feel:
- Natural
- Insightful
- Slightly opinionated
- Based on real-world experience (even if simulated)

---

## Writing Style Rules:

- Write like a human expert, NOT like an AI or textbook.
- Avoid generic lines like:
  "In today's digital world..." or "Businesses are rapidly growing..."
- Use natural phrasing, varied sentence lengths, and occasional conversational tone.
- Add subtle opinions where relevant (e.g., bad practices businesses follow).
- Do NOT over-explain obvious things.

---

## Human Realism Layer (IMPORTANT):

Include at least 2 of the following:
- A realistic scenario (e.g., a shop owner in Sadar Bazaar struggling with online presence)
- A common mistake local businesses make
- A short “what actually happens” insight from experience
- A contrast (what people think vs reality)

---

## Local Context:

- Mention local areas naturally (e.g., Sadar Bazaar, Fatehabad Road, local markets)
- Keep it subtle and relevant, not forced
- Reflect real business behavior in Tier-2 cities

---

## Content Structure:

- Strong hook (first 2-3 lines must grab attention, no fluff)
- Clear sections with meaningful headings
- Mix of short paragraphs + bullet points
- One small practical example or scenario
- Actionable advice (not generic tips)

---

## SEO Guidelines (Natural Only):

- Integrate city + service keywords naturally
- No keyword stuffing
- Title should be compelling and human, not robotic

---

## Tone:

- Professional but not corporate
- Smart but not complex
- Helpful, slightly direct when needed

---

## Output Format (STRICT JSON):

Return ONLY a JSON object:

{
  "title": "Engaging, human-like title with natural keyword usage",
  "excerpt": "2-line summary that feels natural and curiosity-driven",
  "category": "One of: Local Business, Web Development, E-commerce, Performance, Design",
  "readTime": "e.g., 5 min read",
  "content": "Full blog post in Markdown",
  "slug": "clean-url-slug"
}

---

## Topic Input:
User will provide:
- City
- Service (e.g., web design, ecommerce, SEO)

Use them naturally, not forcefully.
`;

export async function generateBlogWithGemini(city: string, service: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const prompt = `
Write a high-quality, human-like blog post about how ${service} impacts local businesses in ${city} in 2026.

Do NOT write a generic "how it helps businesses grow" article.

---

## Angle:
Focus on real-world impact, problems, and practical outcomes.
Make it feel like it’s written by someone who has worked with business owners in ${city}.

---

## Include:

1. A strong, non-generic hook (avoid clichés like "in today's digital world")
2. A realistic scenario of a business in ${city}
   (e.g., a shop owner, local service provider, small brand)
3. 2–3 common mistakes businesses in ${city} make related to ${service}
4. A “what people think vs reality” section (short but insightful)
5. Clear, practical advice (not generic tips)

---

## Local Context:
- Mention real or relatable areas/markets in ${city} naturally
- Reflect how businesses actually operate in Tier-2 Indian cities

---

## Writing Style:
- Natural, slightly conversational, but professional
- Avoid AI-like symmetry and repetitive phrasing
- Vary sentence lengths
- Be slightly opinionated where relevant

---

## SEO:
- Use "${service} in ${city}" naturally (no stuffing)
- Keep it readable first, SEO second

---

## Structure:
- Hook (2–3 lines)
- 3–5 meaningful sections with headings
- Mix paragraphs + bullet points
- Short conclusion + CTA

---

## Output:
Return ONLY a valid JSON object as defined in the System Prompt.
The "content" field must contain the full human-like blog post in Markdown format.
Ensure all quotes within the Markdown are properly escaped for JSON.
`;

  const result = await model.generateContent([
    { text: BLOG_SYSTEM_PROMPT },
    { text: prompt }
  ]);

  const response = await result.response;
  return JSON.parse(response.text());
}
