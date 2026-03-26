import { NextResponse, NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Increase limits to allow larger PDFs
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');

    const prompt = `You are a French wine expert. You received a wine agent PDF document.
Extract ALL the wine references and return them as pure JSON (no markdown, no backticks, no wrap).

Expected exact JSON format:
{
  "agent": "agent name if visible else null",
  "references": [
    {
      "appellation": "appellation or cuvee name",
      "domaine": "domain or producer name",
      "millesime": "year e.g. 2021 or NM if non-vintage",
      "type": "Rouge or Blanc or Rosé or Champagne or Autre",
      "quantite": integer number of bottles,
      "unite": "bouteilles",
      "prix_ht": unitary price HT per bottle in euros as decimal number
    }
  ]
}

Only return raw JSON. If some info is missing, use null. Convert cartons to bottles if necessary (1 carton = 6 bottles).`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: 'application/pdf',
        },
      },
    ]);

    const responseText = result.response.text();
    let cleanedText = responseText.replace(/```(json)?/g, '').replace(/```/g, '').trim();

    try {
      const parsedData = JSON.parse(cleanedText);
      return NextResponse.json(parsedData);
    } catch (parseError) {
      console.error('Failed to parse Gemini output:', cleanedText);
      return NextResponse.json({ error: 'Failed to parse AI output. AI raw response: ' + cleanedText }, { status: 500 });
    }

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
