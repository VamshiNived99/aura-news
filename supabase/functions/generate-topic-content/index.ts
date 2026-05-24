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
    const { topic, subject, unit, examType, category } = await req.json();
    if (!topic) {
      return new Response(JSON.stringify({ error: "Topic is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Generating: ${topic} | ${subject} | ${examType}`);

    const ctx = [subject, unit, examType, category].filter(Boolean).join(", ");
    const isAptitude = (category || "").toLowerCase() === "aptitude" ||
      (unit || "").toLowerCase().includes("aptitude") ||
      (unit || "").toLowerCase().includes("reasoning") ||
      (unit || "").toLowerCase().includes("verbal");

    const prompt = `Create detailed study material for "${topic}"${ctx ? ` (${ctx})` : ""}.

Return valid JSON:
{
  "title": "Topic - Complete Study Material",
  "introduction": "3-4 sentences about topic importance",
  "conceptMap": {"title":"Concept Map","nodes":[{"id":"1","label":"Main Topic","type":"main"},{"id":"2","label":"Sub1","type":"sub","parent":"1"},{"id":"3","label":"Sub2","type":"sub","parent":"1"},{"id":"4","label":"Detail","type":"detail","parent":"2"}]},
  "sections": [
    {
      "heading": "Section Title",
      "content": "Detailed 200+ word explanation",
      "keyPoints": ["point1","point2","point3","point4","point5"],
      "diagram": {"type":"flowchart","title":"Flow","steps":[{"id":"1","text":"Step1","next":["2"]},{"id":"2","text":"Step2"}]},
      "commonMistakes": ["mistake1"],
      "examples": [{"title":"Example","problem":"problem text","approach":"approach","solution":"step by step solution","answer":"answer"}]
    }
  ],
  "formulas": [{"name":"Name","expression":"formula","description":"desc","example":"example"}],
  "comparisonTable": {"title":"Comparison","headers":["Property","A","B"],"rows":[["row1","a","b"]]},
  "mnemonics": [{"topic":"concept","mnemonic":"trick","expansion":"meaning"}],
  "summary": "Summary paragraph",
  "quickRevision": ["point1","point2","point3","point4","point5","point6","point7","point8"],
  "practiceQuestions": [{"question":"Q","options":{"A":"a","B":"b","C":"c","D":"d"},"correctAnswer":"A","explanation":"why","difficulty":"medium","examSource":"Exam 2023"}],
  "previousYearQuestions": [{"year":"2023","exam":"Exam","question":"Q","answer":"A"}],
  "studyTips": ["tip1","tip2","tip3"],
  "examInsights": "How this topic appears in exams",
  "relatedTopics": ["topic1","topic2"],
  "bookReferences": ["book1"]
}

${isAptitude
  ? `APTITUDE MODE: Generate 5 sections. Distribute 18 fully worked examples across the sections (3-4 per section), each with: a clear problem statement, an "approach" describing the trick/shortcut, a numbered step-by-step "solution", a final "answer", and a "shortcut" field with a 1-line speed trick. Examples MUST progress from easy -> medium -> hard and cover ALL major question patterns asked in SSC, Banking (IBPS/SBI), Railway (RRB), CAT, and campus placements. Also generate 12 MCQ practiceQuestions (mix easy/medium/hard, each tagged with examSource like "SSC CGL 2022", "IBPS PO 2023", "RRB NTPC 2022", "CAT 2021"), 6 formulas/shortcuts with worked example, 3 mnemonics, 10 quickRevision bullets, and 5 previousYearQuestions. Focus on speed-solving tricks, common traps, and time-saving techniques.`
  : `Generate 4 sections with 2 examples each, 8 MCQs, 4 formulas, 2 mnemonics, 8 revision points.`}
Use simple ASCII characters only - no special unicode math symbols. Write formulas in plain text like "x^2 + y^2 = r^2".`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "Return ONLY valid JSON. No markdown. No code blocks. Use only ASCII characters." },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        max_tokens: isAptitude ? 14000 : 8000,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Error:", response.status, errorText);
      throw new Error(`AI API returned ${response.status}`);
    }

    const data = await response.json();
    let text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error("No content generated");

    // Clean up
    text = text.trim();
    if (text.startsWith("```json")) text = text.slice(7);
    else if (text.startsWith("```")) text = text.slice(3);
    if (text.endsWith("```")) text = text.slice(0, -3);
    text = text.trim();

    // Remove any control characters that could break JSON
    text = text.replace(/[\x00-\x1F\x7F]/g, (ch) => {
      if (ch === '\n' || ch === '\r' || ch === '\t') return ch;
      return '';
    });

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e1) {
      console.error("Direct parse failed, trying extraction...", e1);
      // Try to find and extract JSON
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start !== -1 && end !== -1 && end > start) {
        try {
          parsed = JSON.parse(text.substring(start, end + 1));
        } catch (e2) {
          console.error("Extraction also failed:", e2);
          throw new Error("Failed to parse AI response");
        }
      } else {
        throw new Error("No JSON found in response");
      }
    }

    if (!parsed.title) parsed.title = topic;
    if (!parsed.sections) parsed.sections = [];
    if (!parsed.practiceQuestions) parsed.practiceQuestions = [];
    if (!parsed.summary) parsed.summary = `Study material for ${topic}.`;

    console.log(`OK: ${parsed.sections?.length} sections, ${parsed.practiceQuestions?.length} MCQs`);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate content" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
