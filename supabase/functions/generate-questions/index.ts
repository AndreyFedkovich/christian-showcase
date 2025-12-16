import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.12.0";

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

    // 1. Используем ключ Google
    const googleApiKey = Deno.env.get('GOOGLE_API_KEY');
    if (!googleApiKey) {
      throw new Error('GOOGLE_API_KEY is not configured');
    }

    console.log('Generating questions:', { category, difficulty, count });

    const categoryLabel = categoryLabels[category] || category;
    const difficultyLabel = difficultyLabels[difficulty] || `Уровень ${difficulty}`;

    // 2. Инициализация клиента Gemini
    const genAI = new GoogleGenerativeAI(googleApiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-pro-preview", // Используем актуальную модель
      // Включаем нативный JSON режим - модель гарантированно вернет JSON
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.8,
      },
      // Системный промпт переезжает сюда
      systemInstruction: `Ты — эксперт по Библии. Генерируй вопросы для викторины на русском языке.

Правила:
- Вопросы должны быть точными и основанными на библейском тексте
- Для difficulty 1: простые факты с однозначными короткими ответами (type: "exact")
- Для difficulty 2: вопросы требующие понимания контекста (type: "exact" или "fuzzy")
- Для difficulty 3: сложные вопросы для развёрнутых ответов (type: "fuzzy")
- type "exact" — требует точного ответа (имя, число, место)
- type "fuzzy" — допускает разные формулировки, оценивается по ключевым словам
- Всегда добавляй ссылку на библейский текст (reference)
- Для fuzzy вопросов добавь массив acceptableKeywords (3-5 ключевых слов)

Формат JSON (без markdown):
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
    });

    // 3. Формируем запрос пользователя
    const prompt = `Сгенерируй ${count} вопросов для библейской викторины.
Категория: ${categoryLabel}
Сложность: ${difficultyLabel}`;

    // 4. Выполняем запрос
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    console.log('AI response:', content);

    // 5. Парсинг JSON
    let parsedData;
    try {
      // Gemini в режиме JSON вернет чистый JSON, но на всякий случай оставляем логику очистки
      // если вдруг прилетит markdown (хотя с responseMimeType не должно)
      const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanContent);
    } catch (e) {
      console.error("JSON Parse Error:", content);
      // Fallback: пробуем найти JSON внутри текста регуляркой (как в старом коде)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI response');
      }
    }

    // Проверка структуры
    if (!parsedData.questions || !Array.isArray(parsedData.questions)) {
      throw new Error('Invalid JSON structure: missing "questions" array');
    }

    // 6. Добавляем метаданные к вопросам (сохраняем вашу логику)
    const questions = parsedData.questions.map((q: any) => ({
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
