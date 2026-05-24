import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, topic, count = 10 } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    console.log(`Generating ${count} questions for ${category} - ${topic}`);

    const systemPrompt = `You are an expert exam question creator who has designed questions for India's top competitive exams including SSC CGL, SSC CHSL, IBPS PO, IBPS Clerk, SBI PO, SBI Clerk, RRB NTPC, RRB Group D, UPSC Prelims, and State PSC exams.

Your questions are known for:
1. Testing true understanding, not just memorization
2. Having cleverly designed distractors that catch common mistakes
3. Including multi-step problems that mirror actual exam difficulty
4. Covering concept application, not just direct formula use

QUESTION QUALITY STANDARDS:
- Questions should be conceptually rich and exam-realistic
- Options must be carefully crafted - wrong options should represent common errors
- Explanations must be educational, explaining the complete solution process
- Each question should teach something valuable

OUTPUT FORMAT - Return ONLY valid JSON:
{
  "questions": [
    {
      "id": "1",
      "question": "Complete, well-formatted question text with all necessary data",
      "options": {
        "A": "First option",
        "B": "Second option", 
        "C": "Third option",
        "D": "Fourth option"
      },
      "correctAnswer": "A",
      "explanation": "Complete step-by-step solution explaining:\\n1. The concept being tested\\n2. How to approach the problem\\n3. Full calculation with each step\\n4. Why the correct answer is right\\n5. Why each wrong option might seem correct (common mistakes)",
      "difficulty": "easy|medium|hard",
      "conceptTested": "The specific concept or skill being assessed",
      "examPattern": "Which exam typically has this type of question"
    }
  ]
}`;

    const userPrompt = `Generate exactly ${count} HIGH-QUALITY multiple choice questions for:
TOPIC: ${topic}
CATEGORY: ${category}

STRICT REQUIREMENTS:
1. Questions MUST match actual competitive exam patterns (SSC/Banking/Railway)
2. Difficulty distribution: ${Math.floor(count * 0.3)} easy, ${Math.floor(count * 0.4)} medium, ${Math.ceil(count * 0.3)} hard
3. Every option must be a plausible answer - avoid obviously wrong choices
4. Explanations must be comprehensive (minimum 100 words each)
5. Include calculation-based, concept-based, and application-based questions
6. Use realistic numbers and scenarios from actual exams
7. Hard questions should require multi-step reasoning
8. Each question should test a different aspect of the topic

Make these questions genuinely challenging and educational. They should help students truly prepare for competitive exams.`;

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
            temperature: 0.8,
            maxOutputTokens: 8192,
            responseMimeType: "application/json"
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later.", questions: [] }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    console.log('Raw response length:', content.length);

    // Extract JSON from response
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = (jsonMatch[1] || jsonMatch[0]).trim();
    }

    const parsed = JSON.parse(jsonStr);
    
    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error('Invalid response structure');
    }

    // Validate and clean questions
    const validQuestions = parsed.questions.map((q: any, idx: number) => ({
      id: String(idx + 1),
      question: q.question || 'Question not available',
      options: {
        A: q.options?.A || 'Option A',
        B: q.options?.B || 'Option B',
        C: q.options?.C || 'Option C',
        D: q.options?.D || 'Option D'
      },
      correctAnswer: ['A', 'B', 'C', 'D'].includes(q.correctAnswer) ? q.correctAnswer : 'A',
      explanation: q.explanation || 'See the solution for explanation.',
      difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium',
      conceptTested: q.conceptTested || topic,
      examPattern: q.examPattern || 'General Competitive Exams'
    }));

    console.log(`Generated ${validQuestions.length} valid questions`);

    return new Response(JSON.stringify({ questions: validQuestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-mock-questions:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      questions: []
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
