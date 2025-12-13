import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Clock, Users } from "lucide-react";
import { Game } from "@/data/games";

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

const GameCard = ({ game, onClick }: GameCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-smooth hover:shadow-premium"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Thumbnail */}
        <div className="md:w-1/3 aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <Gamepad2 className="w-24 h-24 text-white/30" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {game.thumbnail && (
            <img 
              src={game.thumbnail} 
              alt={game.title}
              className="w-full h-full object-cover transition-smooth group-hover:scale-110"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:py-8 md:pr-8 flex flex-col justify-between">
          <div className="space-y-7">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-accent transition-smooth">
              {game.title}
            </h3>
            
            <p className="text-muted-foreground font-sans text-base md:text-lg leading-relaxed">
              {game.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-accent" />
                <span className="font-sans">{game.playerCount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-accent" />
                <span className="font-sans">{game.duration}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-base px-6 py-3 rounded-full shadow-premium transition-smooth hover:scale-105 font-sans font-semibold"
            >
              <Gamepad2 className="mr-2 h-5 w-5" />
              Начать игру
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameCard;
