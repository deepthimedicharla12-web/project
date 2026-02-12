
import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI client
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Generates brand name suggestions
 */
export async function generateBrandNames(industry: string, keywords: string, tone: string) {
  const ai = getAI();
  const prompt = `Generate 15 unique and creative brand names for a business in the ${industry} industry. 
  Keywords: ${keywords}. 
  Tone: ${tone}. 
  Provide the output as a JSON array of objects with "name" and "tagline" properties.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            tagline: { type: Type.STRING }
          },
          required: ['name', 'tagline']
        }
      }
    }
  });

  return JSON.parse(response.text || '[]');
}

/**
 * Generates marketing content
 */
export async function generateMarketingContent(type: 'description' | 'social' | 'ads', brandName: string, brandDetails: string) {
  const ai = getAI();
  const prompts = {
    description: `Write a compelling 200-word product description for ${brandName}. Context: ${brandDetails}.`,
    social: `Generate 5 social media captions with hashtags for ${brandName}. Context: ${brandDetails}.`,
    ads: `Write 3 high-converting ad copies (Headline and Body) for ${brandName}. Context: ${brandDetails}.`
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompts[type]
  });

  return response.text;
}

/**
 * Generates a logo using the image generation model
 */
export async function generateLogo(description: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `A professional, minimalist vector logo for: ${description}. White background, clean lines, high quality, centered.` }]
    },
    config: {
      imageConfig: { aspectRatio: '1:1' }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}

/**
 * Analyzes sentiment of customer reviews
 */
export async function analyzeSentiment(reviews: string) {
  const ai = getAI();
  const prompt = `Analyze the following customer reviews and provide a JSON response. 
  Determine tone, sentiment score (0 to 1), actionable suggestions, and 2 professional rewrites of negative sentiments.
  Reviews: "${reviews}"`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tone: { type: Type.STRING },
          score: { type: Type.NUMBER },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          rewrites: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['tone', 'score', 'suggestions', 'rewrites']
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

/**
 * Generates a visual design system
 */
export async function generateDesignSystem(personality: string) {
  const ai = getAI();
  const prompt = `Create a visual design system for a brand with the personality: "${personality}". 
  Provide 5 HEX color codes that work well together, font suggestions (one for headings, one for body), and a brief visual style description.
  Return as JSON.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          palette: { type: Type.ARRAY, items: { type: Type.STRING } },
          fonts: {
            type: Type.OBJECT,
            properties: {
              heading: { type: Type.STRING },
              body: { type: Type.STRING }
            }
          },
          description: { type: Type.STRING }
        },
        required: ['palette', 'fonts', 'description']
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

/**
 * Chat consultant helper
 */
export function createChatSession(systemInstruction: string) {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    }
  });
}
