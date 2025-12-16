import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI } from "https://esm.sh/google-genai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Обработка Preflight запроса (CORS)
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, correctAnswer, userAnswer, acceptableKeywords } = await req.json();

    // 1. Проверяем ключ Google
    const googleApiKey = Deno.env.get('GOOGLE_API_KEY');
    if (!googleApiKey) {
      throw new Error('GOOGLE_API_KEY is not configured');
    }

    console.log('Checking answer:', { question, userAnswer, correctAnswer });

    // 1. Инициализация клиента
    const client = new GoogleGenAI({ apiKey: googleApiKey });

    // 2. Подготовка промптов
    const systemInstruction = `Ты — судья библейской викторины на русском языке. Оцени ответ игрока.
Ответ засчитывается как верный, если он передаёт суть правильного ответа, даже если формулировка немного другая.
Будь снисходительным к опечаткам и синонимам.

Ответь ТОЛЬКО валидным JSON объектом (без markdown обертки):
{
  "isCorrect": boolean,
  "feedback": "string (краткое объяснение на русском)"
}`;

    const userPrompt = `Вопрос: ${question}
Правильный ответ: ${correctAnswer}
Ключевые понятия: ${acceptableKeywords?.join(', ') || 'нет'}
Ответ игрока: ${userAnswer}`;

    // 4. Отправляем в Gemini
    const response = await client.models.generateContent({
      model: 'gemini-3-pro-preview',
      config: {
        // Гарантируем JSON ответ
        responseMimeType: 'application/json',
        // Низкая температура для "Судьи" (более предсказуемые ответы)
        temperature: 0.3,
        systemInstruction: systemInstruction,
      },
      contents: [
        {
          role: 'user',
          parts: [
            { text: userPrompt }
          ]
        }
      ]
    });

    // 4. Получение текста ответа
    const content = response.text();
    console.log('AI response:', content);

    // 5. Парсим ответ
    let parsedData;
    try {
      // Очистка на случай, если модель все же добавит markdown
      const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanContent);
    } catch (e) {
      console.error("JSON Parse Error:", content);
      // Fallback: пробуем найти true/false простым поиском
      const isCorrect = content.toLowerCase().includes('"iscorrect": true') ||
          content.toLowerCase().includes('"iscorrect":true');
      parsedData = {
        isCorrect,
        feedback: 'Ответ проверен AI (ошибка парсинга JSON, результат приблизительный)'
      };
    }

    return new Response(JSON.stringify(parsedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in check-answer function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Возвращаем структуру ошибки, которую ждет фронтенд
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
