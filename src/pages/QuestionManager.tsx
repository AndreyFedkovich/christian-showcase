import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestions } from '@/hooks/useQuestions';
import { QuestionTable } from '@/components/game/bible-master/QuestionTable';
import { QuestionForm } from '@/components/game/bible-master/QuestionForm';
import { GenerateQuestionsDialog } from '@/components/game/bible-master/GenerateQuestionsDialog';
import { BibleQuestion, QuestionCategory, Difficulty, categoryLabels, difficultyLabels } from '@/data/bible-questions';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Plus, Sparkles, Download, Upload, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const QuestionManager = () => {
  const navigate = useNavigate();
  const { 
    baseQuestions, 
    customQuestions, 
    addQuestion, 
    addQuestions,
    updateQuestion, 
    deleteQuestion,
    clearCustomQuestions,
    exportQuestions,
    importQuestions,
    getFilteredQuestions 
  } = useQuestions();

  const [formOpen, setFormOpen] = useState(false);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);

  const [filterCategory, setFilterCategory] = useState<QuestionCategory | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all');

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setFormOpen(true);
  };

  const handleFormSubmit = (question: BibleQuestion) => {
    if (editIndex !== null) {
      updateQuestion(editIndex, question);
      toast.success('Вопрос обновлён');
    } else {
      addQuestion(question);
      toast.success('Вопрос добавлен');
    }
    setEditIndex(null);
  };

  const handleDelete = () => {
    if (deleteIndex !== null) {
      deleteQuestion(deleteIndex);
      toast.success('Вопрос удалён');
      setDeleteIndex(null);
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const count = await importQuestions(file);
          toast.success(`Импортировано ${count} вопросов`);
        } catch {
          toast.error('Ошибка импорта файла');
        }
      }
    };
    input.click();
  };

  const handleClear = () => {
    clearCustomQuestions();
    setClearConfirmOpen(false);
    toast.success('Все пользовательские вопросы удалены');
  };

  const filteredBase = getFilteredQuestions(
    filterDifficulty === 'all' ? undefined : filterDifficulty,
    filterCategory === 'all' ? undefined : filterCategory,
    'base'
  );

  const filteredCustom = getFilteredQuestions(
    filterDifficulty === 'all' ? undefined : filterDifficulty,
    filterCategory === 'all' ? undefined : filterCategory,
    'custom'
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/game/bible-master/play')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Управление вопросами</h1>
              <p className="text-sm text-muted-foreground">
                Базовых: {baseQuestions.length} • Пользовательских: {customQuestions.length}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить
            </Button>
            <Button onClick={() => setGenerateOpen(true)}>
              <Sparkles className="h-4 w-4 mr-2" />
              Генерировать AI
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Filters */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Фильтры</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="w-48">
                <Select
                  value={filterCategory}
                  onValueChange={(v) => setFilterCategory(v as QuestionCategory | 'all')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Все категории" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-40">
                <Select
                  value={filterDifficulty === 'all' ? 'all' : String(filterDifficulty)}
                  onValueChange={(v) => setFilterDifficulty(v === 'all' ? 'all' : Number(v) as Difficulty)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Все сложности" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все сложности</SelectItem>
                    {Object.entries(difficultyLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="custom">
          <TabsList>
            <TabsTrigger value="custom">
              Пользовательские ({filteredCustom.length})
            </TabsTrigger>
            <TabsTrigger value="base">
              Базовые ({filteredBase.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="custom" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Пользовательские вопросы</CardTitle>
                  <CardDescription>
                    Вопросы, добавленные вручную или сгенерированные AI
                  </CardDescription>
                </div>
                {customQuestions.length > 0 && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={exportQuestions}>
                      <Download className="h-4 w-4 mr-2" />
                      Экспорт
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleImport}>
                      <Upload className="h-4 w-4 mr-2" />
                      Импорт
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setClearConfirmOpen(true)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Очистить все
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <QuestionTable 
                  questions={filteredCustom} 
                  isCustom 
                  onEdit={handleEdit}
                  onDelete={(i) => setDeleteIndex(i)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="base" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Базовые вопросы</CardTitle>
                <CardDescription>
                  Встроенные вопросы приложения (только для чтения)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuestionTable questions={filteredBase} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Form Dialog */}
      <QuestionForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditIndex(null);
        }}
        initialData={editIndex !== null ? customQuestions[editIndex] : undefined}
        onSubmit={handleFormSubmit}
      />

      {/* Generate Dialog */}
      <GenerateQuestionsDialog
        open={generateOpen}
        onOpenChange={setGenerateOpen}
        onGenerated={addQuestions}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteIndex !== null} onOpenChange={() => setDeleteIndex(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить вопрос?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear All Confirmation */}
      <AlertDialog open={clearConfirmOpen} onOpenChange={setClearConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить все пользовательские вопросы?</AlertDialogTitle>
            <AlertDialogDescription>
              Все {customQuestions.length} пользовательских вопросов будут удалены. Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleClear} className="bg-destructive text-destructive-foreground">
              Удалить все
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuestionManager;
