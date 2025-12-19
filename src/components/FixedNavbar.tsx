import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Globe, LogIn, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
}

const FixedNavbar = ({ isScrolled, onNavigate }: FixedNavbarProps) => {
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
              "text-lg font-medium transition-colors",
              textColorMuted,
              "hover:opacity-100"
            )}
          >
            Презентации
          </button>
          <button
            onClick={() => onNavigate('games')}
            className={cn(
              "text-lg font-medium transition-colors",
              textColorMuted,
              "hover:opacity-100"
            )}
          >
            Игры
          </button>
        </div>

        {/* Right: Search, Language, User */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("hidden md:flex", hoverBg)}
          >
            <Search className={cn("w-6 h-6", textColorMuted)} />
          </Button>

          {/* Language */}
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("gap-1.5", hoverBg, textColorMuted)}
          >
            <Globe className="w-5 h-5" />
            <span className="text-base font-medium">EN</span>
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
                  A
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-48 bg-popover border border-border shadow-lg rounded-lg p-1"
            >
              <div className="px-3 py-2">
                <p className="font-medium text-foreground">fedkovich</p>
                <p className="text-sm text-muted-foreground">fedkovich@gmail.com</p>
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
                "block w-full text-left py-2 px-3 rounded-lg font-medium transition-colors",
                textColorMuted,
                hoverBg
              )}
            >
              Презентации
            </button>
            <button
              onClick={() => {
                onNavigate('games');
                setMobileMenuOpen(false);
              }}
              className={cn(
                "block w-full text-left py-2 px-3 rounded-lg font-medium transition-colors",
                textColorMuted,
                hoverBg
              )}
            >
              Игры
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default FixedNavbar;
