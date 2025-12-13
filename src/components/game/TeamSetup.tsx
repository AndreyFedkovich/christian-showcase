import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Play, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TeamSetupProps {
  onStart: (teamName: string, opponentName: string) => void;
}

const TeamSetup = ({ onStart }: TeamSetupProps) => {
  const [teamName, setTeamName] = useState("Команда");
  const [opponentName, setOpponentName] = useState("Противник");
  const navigate = useNavigate();

  const handleStart = () => {
    onStart(teamName || "Команда", opponentName || "Противник");
  };

  return (
    <div className="min-h-screen gradient-warm flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Title */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Настройка игры
            </h1>
            <p className="text-muted-foreground font-sans">
              Введите названия команд для начала игры
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6 bg-card p-8 rounded-2xl shadow-card">
            <div className="space-y-2">
              <Label htmlFor="team" className="text-foreground font-sans">
                Название вашей команды
              </Label>
              <Input
                id="team"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Команда"
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="opponent" className="text-foreground font-sans">
                Название команды противника
              </Label>
              <Input
                id="opponent"
                value={opponentName}
                onChange={(e) => setOpponentName(e.target.value)}
                placeholder="Противник"
                className="h-12 text-lg"
              />
            </div>

            {/* Rules summary */}
            <div className="p-4 bg-muted/50 rounded-xl space-y-2">
              <h3 className="font-semibold text-foreground">Правила игры:</h3>
              <ul className="text-sm text-muted-foreground font-sans space-y-1">
                <li>• Игра до 10 очков</li>
                <li>• Сложность раунда выбирается случайно</li>
                <li>• Тема вопроса выбирается случайно</li>
                <li>• Правильный ответ на все вопросы = +1 очко вам</li>
                <li>• Любая ошибка = +1 очко противнику</li>
              </ul>
            </div>
          </div>

          {/* Start button */}
          <Button
            onClick={handleStart}
            size="lg"
            className="w-full h-14 text-lg rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-sans font-semibold transition-smooth hover:scale-105 shadow-premium"
          >
            <Play className="mr-2 w-5 h-5" />
            Начать игру
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TeamSetup;
