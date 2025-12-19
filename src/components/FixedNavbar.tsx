import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Globe, LogIn, Menu, X, BookOpen, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FixedNavbarProps {
  isScrolled: boolean;
  onNavigate: (section: 'presentations' | 'games') => void;
  activeTab: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const FixedNavbar = ({ isScrolled, onNavigate, activeTab, searchQuery, onSearchChange }: FixedNavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const textColor = isScrolled ? "text-foreground" : "text-white";
  const textColorMuted = isScrolled ? "text-muted-foreground" : "text-white/70";
  const hoverBg = isScrolled ? "hover:bg-muted" : "hover:bg-white/10";

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50" 
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Left: Logo + Site name */}
        <div className="flex items-center gap-3">
          <img 
            src="/favicon.png" 
            alt="Logo" 
            className="w-10 h-10 object-contain"
          />
          <span className={cn(
            "font-bold text-xl transition-colors",
            textColor
          )}>
            Интерактивная Библия
          </span>
        </div>

        {/* Center: Navigation - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onNavigate('presentations')}
            className={cn(
              "flex items-center gap-2 text-lg font-medium transition-colors pb-2 border-b-2",
              activeTab === 'presentations' 
                ? (isScrolled ? "text-primary border-primary" : "text-white border-white")
                : (isScrolled ? "text-muted-foreground border-transparent hover:text-primary/80" : "text-white/70 border-transparent hover:text-white")
            )}
          >
            <BookOpen className="w-5 h-5" />
            Презентации
          </button>
          <button
            onClick={() => onNavigate('games')}
            className={cn(
              "flex items-center gap-2 text-lg font-medium transition-colors pb-2 border-b-2",
              activeTab === 'games' 
                ? (isScrolled ? "text-violet-600 border-violet-500" : "text-white border-white")
                : (isScrolled ? "text-muted-foreground border-transparent hover:text-violet-600" : "text-white/70 border-transparent hover:text-white")
            )}
          >
            <Gamepad2 className="w-5 h-5" />
            Игры
          </button>
        </div>

        {/* Right: Search field (when scrolled) + Language + User */}
        <div className="flex items-center gap-2">
          {/* Search field - visible when scrolled */}
          {isScrolled && (
            <div className="hidden md:flex relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-10 bg-background border-border focus:border-primary rounded-xl"
              />
            </div>
          )}

          {/* Search icon - hidden when scrolled */}
          {!isScrolled && (
            <Button variant="ghost" size="sm" className={cn("hidden md:flex [&_svg]:size-6", hoverBg)}>
              <Search className={cn("w-10 h-10", textColorMuted)} />
            </Button>
          )}

          {/* Language */}
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("gap-1.5 [&_svg]:size-6", hoverBg, textColorMuted)}
          >
            <Globe className="w-5 h-5" />
            <span className="text-base font-medium">RU</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("rounded-full p-0", hoverBg)}
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-base">
                  G
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-48 bg-popover border border-border shadow-lg rounded-lg p-1"
            >
              <div className="px-3 py-2">
                <p className="font-medium text-foreground">Guest</p>
                <p className="text-sm text-muted-foreground">guest@gmail.com</p>
              </div>
              <DropdownMenuItem className="cursor-pointer text-foreground hover:bg-muted rounded-md mx-1">
                <LogIn className="w-4 h-4 mr-2 rotate-180" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={cn("md:hidden", hoverBg)}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={cn("w-6 h-6", textColor)} />
            ) : (
              <Menu className={cn("w-6 h-6", textColor)} />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={cn(
            "md:hidden border-t",
            isScrolled 
              ? "bg-background/95 backdrop-blur-md border-border/50" 
              : "bg-black/80 backdrop-blur-md border-white/10"
          )}
        >
          <div className="px-4 py-4 space-y-2">
            <button
              onClick={() => {
                onNavigate('presentations');
                setMobileMenuOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 w-full text-left py-2 px-3 rounded-lg font-medium transition-colors",
                activeTab === 'presentations'
                  ? (isScrolled ? "text-primary bg-primary/10" : "text-white bg-white/10")
                  : textColorMuted,
                hoverBg
              )}
            >
              <BookOpen className="w-5 h-5" />
              Презентации
            </button>
            <button
              onClick={() => {
                onNavigate('games');
                setMobileMenuOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 w-full text-left py-2 px-3 rounded-lg font-medium transition-colors",
                activeTab === 'games'
                  ? (isScrolled ? "text-violet-600 bg-violet-500/10" : "text-white bg-white/10")
                  : textColorMuted,
                hoverBg
              )}
            >
              <Gamepad2 className="w-5 h-5" />
              Игры
            </button>
            
            {/* Mobile search */}
            <div className="relative pt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 mt-1 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-11 bg-background/50 border-border focus:border-primary rounded-xl"
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default FixedNavbar;
