import { useLanguage } from "@/contexts/LanguageContext";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const { t } = useLanguage();

  const baseClasses =
    "py-8 text-center text-muted-foreground font-sans text-sm border-t border-border/50 mt-auto";

  const combinedClassName = className
    ? `${baseClasses} ${className}`
    : baseClasses;

  return (
    <footer className={combinedClassName}>
      <p>{t("footer")}</p>
    </footer>
  );
};

export default Footer;

