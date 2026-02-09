import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="mt-auto py-8 text-center text-muted-foreground font-sans text-sm border-t border-border/50">
      <p>{t('footer')}</p>
    </footer>
  );
};

export default Footer;
