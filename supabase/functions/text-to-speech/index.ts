import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Language to voice mapping for natural TTS
const LANGUAGE_VOICES: Record<string, { lang: string; name: string }> = {
  'en': { lang: 'en-IN', name: 'en-IN' },
  'hi': { lang: 'hi-IN', name: 'hi-IN' },
  'te': { lang: 'te-IN', name: 'te-IN' },
  'ta': { lang: 'ta-IN', name: 'ta-IN' },
  'kn': { lang: 'kn-IN', name: 'kn-IN' },
  'ml': { lang: 'ml-IN', name: 'ml-IN' },
  'mr': { lang: 'mr-IN', name: 'mr-IN' },
  'bn': { lang: 'bn-IN', name: 'bn-IN' },
  'gu': { lang: 'gu-IN', name: 'gu-IN' },
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, language = 'en' } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Clean and prepare text for TTS
    const cleanText = text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ')    // Normalize whitespace
      .trim()
      .substring(0, 1000);     // Limit length

    const voiceConfig = LANGUAGE_VOICES[language] || LANGUAGE_VOICES['en'];

    // Use Lovable AI to generate speech-optimized text summary
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a news reader. Convert the given news text into natural, spoken language suitable for text-to-speech. Keep it concise (2-3 sentences max). Language: ${voiceConfig.lang}. Do not add any commentary, just rephrase the news naturally.`
          },
          {
            role: 'user',
            content: cleanText
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      console.error('AI response error:', await aiResponse.text());
      // Fallback to original text if AI fails
      return new Response(
        JSON.stringify({ 
          text: cleanText,
          language: voiceConfig.lang,
          success: true 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const processedText = aiData.choices?.[0]?.message?.content || cleanText;

    console.log(`TTS: Processed text for ${voiceConfig.lang}, length: ${processedText.length}`);

    return new Response(
      JSON.stringify({ 
        text: processedText,
        language: voiceConfig.lang,
        success: true 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('TTS Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});