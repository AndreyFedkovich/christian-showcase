import { BibleQuestion, categoryLabels, difficultyLabels } from '@/data/bible-questions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';

interface QuestionTableProps {
  questions: BibleQuestion[];
  isCustom?: boolean;
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
}

export const QuestionTable = ({ questions, isCustom, onEdit, onDelete }: QuestionTableProps) => {
  if (questions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Нет вопросов для отображения
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Вопрос</TableHead>
            <TableHead className="w-[140px]">Категория</TableHead>
            <TableHead className="w-[100px]">Сложность</TableHead>
            <TableHead className="w-[80px]">Тип</TableHead>
            {isCustom && <TableHead className="w-[100px]">Действия</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((q, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="max-w-[400px]">
                <div className="truncate" title={q.question}>{q.question}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Ответ: {q.correctAnswer}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{categoryLabels[q.category]}</Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={q.difficulty === 1 ? 'default' : q.difficulty === 2 ? 'secondary' : 'destructive'}
                >
                  {difficultyLabels[q.difficulty]}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {q.type === 'exact' ? 'Точный' : 'Нечёткий'}
                </Badge>
              </TableCell>
              {isCustom && (
                <TableCell>
                  <div className="flex gap-1">
                    {onEdit && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onEdit(index)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onDelete(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
