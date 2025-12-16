import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const categoryLabels: Record<string, string> = {
  'old-testament': 'Ветхий Завет',
  'new-testament': 'Новый Завет',
  'parables': 'Притчи Иисуса',
  'miracles': 'Чудеса',
  'prophets': 'Пророки',
  'epistles': 'Послания'
};

const difficultyLabels: Record<number, string> = {
  1: 'Легкий (простые факты, короткие ответы)',
  2: 'Средний (требует знания контекста)',
  3: 'Сложный (глубокое понимание, развёрнутые ответы)'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, difficulty, count = 5 } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log('Generating questions:', { category, difficulty, count });

    const categoryLabel = categoryLabels[category] || category;
    const difficultyLabel = difficultyLabels[difficulty] || `Уровень ${difficulty}`;

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
            content: `Ты — эксперт по Библии. Генерируй вопросы для викторины на русском языке.

Правила:
- Вопросы должны быть точными и основанными на библейском тексте
- Для difficulty 1: простые факты с однозначными короткими ответами (type: "exact")
- Для difficulty 2: вопросы требующие понимания контекста (type: "exact" или "fuzzy")
- Для difficulty 3: сложные вопросы для развёрнутых ответов (type: "fuzzy")
- type "exact" — требует точного ответа (имя, число, место)
- type "fuzzy" — допускает разные формулировки, оценивается по ключевым словам
- Всегда добавляй ссылку на библейский текст (reference)
- Для fuzzy вопросов добавь массив acceptableKeywords (3-5 ключевых слов)

Ответь ТОЛЬКО в формате JSON без markdown:
{
  "questions": [
    {
      "question": "текст вопроса",
      "type": "exact" или "fuzzy",
      "correctAnswer": "правильный ответ",
      "acceptableKeywords": ["слово1", "слово2"],
      "reference": "Книга глава:стих"
    }
  ]
}`
          },
          {
            role: 'user',
            content: `Сгенерируй ${count} вопросов для библейской викторины.
Категория: ${categoryLabel}
Сложность: ${difficultyLabel}`
          }
        ],
        temperature: 0.8,
        max_tokens: 2000
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
      // Try to extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI response');
      }
    }

    // Add category and difficulty to each question
    const questions = result.questions.map((q: any) => ({
      ...q,
      category,
      difficulty
    }));

    return new Response(JSON.stringify({ questions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error in generate-questions function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      questions: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
