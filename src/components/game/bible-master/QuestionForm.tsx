import { useState } from 'react';
import { BibleQuestion, QuestionCategory, Difficulty, categoryLabels, difficultyLabels } from '@/data/bible-questions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface QuestionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: BibleQuestion;
  onSubmit: (question: BibleQuestion) => void;
}

const defaultQuestion: BibleQuestion = {
  question: '',
  type: 'exact',
  difficulty: 1,
  category: 'old-testament',
  correctAnswer: '',
  acceptableKeywords: [],
  reference: ''
};

export const QuestionForm = ({ open, onOpenChange, initialData, onSubmit }: QuestionFormProps) => {
  const [formData, setFormData] = useState<BibleQuestion>(initialData || defaultQuestion);
  const [keywordsText, setKeywordsText] = useState(initialData?.acceptableKeywords?.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const keywords = keywordsText
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    onSubmit({
      ...formData,
      acceptableKeywords: keywords.length > 0 ? keywords : undefined
    });
    
    setFormData(defaultQuestion);
    setKeywordsText('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Редактировать вопрос' : 'Добавить вопрос'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Вопрос *</Label>
            <Textarea
              id="question"
              value={formData.question}
              onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
              placeholder="Введите текст вопроса"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Категория *</Label>
              <Select
                value={formData.category}
                onValueChange={(value: QuestionCategory) => 
                  setFormData(prev => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Сложность *</Label>
              <Select
                value={String(formData.difficulty)}
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, difficulty: Number(value) as Difficulty }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(difficultyLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Тип ответа *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: 'exact' | 'fuzzy') => 
                  setFormData(prev => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exact">Точный</SelectItem>
                  <SelectItem value="fuzzy">Нечёткий (AI)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Ссылка на Библию</Label>
              <Input
                id="reference"
                value={formData.reference || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                placeholder="Например: Бытие 1:1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="correctAnswer">Правильный ответ *</Label>
            <Input
              id="correctAnswer"
              value={formData.correctAnswer}
              onChange={(e) => setFormData(prev => ({ ...prev, correctAnswer: e.target.value }))}
              placeholder="Введите правильный ответ"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">
              Ключевые слова {formData.type === 'fuzzy' && '(для AI проверки)'}
            </Label>
            <Input
              id="keywords"
              value={keywordsText}
              onChange={(e) => setKeywordsText(e.target.value)}
              placeholder="Слово1, слово2, слово3"
            />
            <p className="text-xs text-muted-foreground">
              Введите ключевые слова через запятую
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit">
              {initialData ? 'Сохранить' : 'Добавить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
