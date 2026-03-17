import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 });
    }

    // Using exactly one stable model for consistency
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.9,
      },
    });

    const prompt = `
      You are a World-Class Conversion Rate Optimization (CRO) and SEO Specialist working for "Arcova Studio", a premium web design agency in Agra, India.
      
      Website URL: ${url}
      
      Generate a professional website audit report in JSON format:
      {
        "score": number (0-100),
        "scores": { "seo": number, "performance": number, "design": number, "security": number },
        "criticalImprovements": string[],
        "summary": string
      }
      
      Tone: Technical, provactive, Agra-market focused.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return NextResponse.json(JSON.parse(responseText.trim()));

  } catch (error: any) {
    console.error("Audit API Error:", error.message);
    
    let errorMessage = "AI Generation failed. Please try again later.";
    let status = 500;

    if (error.status === 429) {
      errorMessage = "AI Quota Exceeded. Please check your Gemini API plan.";
      status = 429;
    } else if (error.status === 400) {
      errorMessage = "Invalid request. Please check your website URL.";
      status = 400;
    }

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
