import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Globe, LogIn, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface FixedNavbarProps {
  isScrolled: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const FixedNavbar = ({ isScrolled, searchQuery, onSearchChange }: FixedNavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const textColor = isScrolled ? "text-foreground" : "text-white";
  const textColorMuted = isScrolled ? "text-muted-foreground" : "text-white";
  const hoverBg = isScrolled ? "hover:bg-muted" : "hover:bg-white/10";

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

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
          {/* Logo with conditional Santa hat */}
          <div className="relative">
            <img 
              src="/favicon.png" 
              alt="Logo" 
              className="w-10 h-10 object-contain"
            />
            {/* Santa hat - only Dec 1 - Jan 31 */}
            {(new Date().getMonth() === 11 || new Date().getMonth() === 0) && (
              <svg 
                className="absolute -top-2 -right-2 w-5 h-5 drop-shadow-sm transform rotate-[24deg]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M4 22 L12 2 L20 22 Z" fill="#dc2626" />
                <rect x="2" y="19" width="20" height="5" rx="2.5" fill="white" />
                <circle cx="12" cy="3" r="3" fill="white" />
              </svg>
            )}
          </div>
          <span className={cn(
            "font-bold text-xl transition-colors",
            textColor
          )}>
            {t('siteName')}
          </span>
        </div>

        {/* Right: Search field (when scrolled) + Language + User */}
        <div className="flex items-center gap-2">
          {/* Search field - visible when scrolled */}
          {isScrolled && (
            <div className="hidden md:flex relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-10 bg-card border-border focus:border-primary rounded-xl"
              />
            </div>
          )}

          {/* Search icon - hidden when scrolled */}
          {!isScrolled && (
            <Button variant="ghost" size="sm" className={cn("hidden md:flex [&_svg]:size-6", hoverBg)}>
              <Search className={cn("w-10 h-10", textColorMuted)} />
            </Button>
          )}

          {/* Language Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("gap-1.5 [&_svg]:size-6", hoverBg, textColorMuted)}
            onClick={toggleLanguage}
          >
            <Globe className={cn("w-5 h-5", textColorMuted)} />
            <span className={cn("text-base font-medium uppercase", textColorMuted)}>
              {language}
            </span>
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
                <p className="font-medium text-foreground">{t('guest')}</p>
                <p className="text-sm text-muted-foreground">guest@gmail.com</p>
              </div>
              <DropdownMenuItem className="cursor-pointer text-foreground hover:bg-muted rounded-md mx-1">
                <LogIn className="w-4 h-4 mr-2 rotate-180" />
                {t('logout')}
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
            {/* Mobile search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-11 bg-card border-border focus:border-primary rounded-xl"
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default FixedNavbar;
