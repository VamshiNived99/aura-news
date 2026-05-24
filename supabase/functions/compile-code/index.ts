import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Language configurations for JDoodle-compatible execution
const languageConfig: Record<string, { language: string; versionIndex: string }> = {
  python: { language: "python3", versionIndex: "4" },
  javascript: { language: "nodejs", versionIndex: "4" },
  java: { language: "java", versionIndex: "4" },
  cpp: { language: "cpp17", versionIndex: "0" },
  c: { language: "c", versionIndex: "5" },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, language, input } = await req.json();
    
    if (!code || !language) {
      return new Response(
        JSON.stringify({ error: "Code and language are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const langConfig = languageConfig[language];
    if (!langConfig) {
      return new Response(
        JSON.stringify({ error: `Unsupported language: ${language}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use Lovable AI to simulate code execution with analysis
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a code execution simulator. Given code in ${language}, analyze and predict the exact output.

RULES:
1. Return ONLY the program output, nothing else
2. If code has errors, return the error message like a real compiler would
3. If code asks for input, use the provided input or default values
4. Format output exactly as the program would produce
5. For print statements, show each on a new line
6. Do NOT include explanations, just raw output`;

    const userPrompt = `Execute this ${language} code and return the output:

\`\`\`${language}
${code}
\`\`\`

${input ? `User input: ${input}` : ''}

Return ONLY the program output:`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("Failed to execute code");
    }

    const data = await response.json();
    const output = data.choices?.[0]?.message?.content || "No output";

    // Clean up the output - remove markdown code blocks if present
    let cleanOutput = output
      .replace(/```[\w]*\n?/g, '')
      .replace(/```/g, '')
      .trim();

    return new Response(
      JSON.stringify({ 
        output: cleanOutput,
        success: true
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Compilation error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Compilation failed",
        output: `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
