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
    const { question, correctAnswer, userAnswer, acceptableKeywords } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log('Checking answer:', { question, userAnswer, correctAnswer });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Ты — судья библейской викторины на русском языке. Оцени ответ игрока.
Ответ засчитывается как верный, если он передаёт суть правильного ответа, даже если формулировка немного другая.
Будь снисходительным к опечаткам и синонимам.

Ответь ТОЛЬКО в формате JSON без markdown:
{"isCorrect": true или false, "feedback": "краткое объяснение на русском"}`
          },
          {
            role: 'user',
            content: `Вопрос: ${question}
Правильный ответ: ${correctAnswer}
Ключевые понятия: ${acceptableKeywords?.join(', ') || 'нет'}
Ответ игрока: ${userAnswer}`
          }
        ],
        temperature: 0.3,
        max_tokens: 150
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log('AI response:', content);

    // Parse JSON response
    let result;
    try {
      result = JSON.parse(content);
    } catch {
      // If parsing fails, try to extract from response
      const isCorrect = content.toLowerCase().includes('"iscorrect": true') || 
                        content.toLowerCase().includes('"iscorrect":true');
      result = {
        isCorrect,
        feedback: 'Ответ проверен AI'
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error in check-answer function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      isCorrect: false,
      feedback: 'Ошибка проверки ответа'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
