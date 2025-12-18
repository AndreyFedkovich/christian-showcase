import { useState } from 'react';
import { QuestionCategory, Difficulty, categoryLabels, difficultyLabels } from '@/data/bible-questions';
import { generateQuestionsWithAI } from '@/lib/ai-service';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface GenerateQuestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerated: (questions: any[]) => void;
}

export const GenerateQuestionsDialog = ({ open, onOpenChange, onGenerated }: GenerateQuestionsDialogProps) => {
  const [category, setCategory] = useState<QuestionCategory>('old-testament');
  const [difficulty, setDifficulty] = useState<Difficulty>(1);
  const [count, setCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const questions = await generateQuestionsWithAI({ category, difficulty, count });
      onGenerated(questions);
      toast.success(`Сгенерировано ${questions.length} вопросов`);
      onOpenChange(false);
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Ошибка генерации вопросов');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Генерация вопросов AI
          </DialogTitle>
          <DialogDescription>
            AI сгенерирует библейские вопросы на основе выбранных параметров
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Категория</Label>
            <Select
              value={category}
              onValueChange={(value: QuestionCategory) => setCategory(value)}
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
            <Label>Сложность</Label>
            <Select
              value={String(difficulty)}
              onValueChange={(value) => setDifficulty(Number(value) as Difficulty)}
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

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Количество вопросов</Label>
              <span className="text-sm font-medium">{count}</span>
            </div>
            <Slider
              value={[count]}
              onValueChange={([value]) => setCount(value)}
              min={1}
              max={10}
              step={1}
            />
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Генерация...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Сгенерировать
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
