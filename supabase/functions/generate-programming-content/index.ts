import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, language, category } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    console.log(`Generating programming content for: ${topic} - ${language}`);

    const systemPrompt = `You are a world-class programming instructor and software engineer with expertise in teaching ${language}. You've helped thousands of students master programming from scratch.

Your teaching style:
- Start from fundamentals and build up complexity
- Use real-world analogies to explain abstract concepts
- Provide production-quality code examples
- Anticipate common mistakes and address them proactively
- Include industry best practices and coding standards

OUTPUT FORMAT - Return ONLY valid JSON:
{
  "title": "Topic Title",
  "introduction": "Engaging introduction explaining why this topic is important (3-4 sentences)",
  "concepts": [
    {
      "name": "Concept Name",
      "explanation": "Clear, detailed explanation with analogies (minimum 150 words)",
      "syntax": "Code syntax pattern with explanation",
      "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
      "realWorldUse": "How this is used in real applications"
    }
  ],
  "codeExamples": [
    {
      "title": "Example Title",
      "description": "What this example demonstrates and why it's useful",
      "code": "Complete, runnable code with detailed comments explaining each line",
      "output": "Exact expected output",
      "explanation": "Line-by-line breakdown of what the code does",
      "bestPractices": ["Best practice demonstrated in this example"]
    }
  ],
  "practiceProblems": [
    {
      "title": "Problem Title",
      "difficulty": "easy|medium|hard",
      "problem": "Detailed problem statement with clear requirements",
      "inputExample": "Example input",
      "outputExample": "Expected output for the input",
      "hint": "Helpful hint without giving away the solution",
      "solution": "Complete, well-commented solution code",
      "explanation": "How the solution works and alternative approaches"
    }
  ],
  "commonMistakes": [
    {
      "mistake": "What beginners commonly do wrong",
      "why": "Why this is wrong and what problems it causes",
      "correct": "The correct approach",
      "wrongCode": "Example of incorrect code",
      "correctCode": "Example of correct code"
    }
  ],
  "summary": "Key takeaways in bullet points",
  "interviewTips": ["Tip 1", "Tip 2", "Tip 3"],
  "nextSteps": ["What to learn next 1", "What to learn next 2"]
}`;

    const userPrompt = `Create COMPREHENSIVE programming tutorial for:
TOPIC: ${topic}
LANGUAGE: ${language}
CATEGORY: ${category}

MANDATORY REQUIREMENTS:
1. Explain 3-5 core concepts in depth with real-world analogies
2. Include 8-10 complete, runnable code examples (progressively complex)
3. Add 5-7 practice problems:
   - 2 Easy (basic concept application)
   - 3 Medium (combining concepts)
   - 2 Hard (interview-level challenges)
4. Cover 4-6 common mistakes with wrong vs correct code
5. All code must be production-quality with proper error handling
6. Include comments explaining every important line
7. Add interview tips for this topic
8. Use industry-standard coding conventions for ${language}

Make this tutorial complete enough that someone could master this topic just by reading it. Focus on practical, employable skills.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt + "\n\n" + userPrompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 8192,
            responseMimeType: "application/json"
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please wait and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    console.log('Raw response length:', content.length);

    let parsedContent;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || content.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? (jsonMatch[1] || jsonMatch[0]).trim() : content.trim();
      parsedContent = JSON.parse(jsonString);
    } catch {
      console.error("Failed to parse response as JSON");
      parsedContent = {
        title: topic,
        introduction: content.substring(0, 500),
        concepts: [],
        codeExamples: [],
        practiceProblems: [],
        commonMistakes: [],
        summary: "",
        interviewTips: [],
        nextSteps: []
      };
    }

    return new Response(JSON.stringify(parsedContent), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
