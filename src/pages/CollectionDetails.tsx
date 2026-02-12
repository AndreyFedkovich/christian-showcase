import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft, BookOpen } from "lucide-react";
import { collections } from "@/data/collections";
import { presentations } from "@/data/presentations";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Footer from "@/components/Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CollectionDetails = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const collection = collections.find((c) => c.id === collectionId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!collection) {
      navigate("/");
    }
  }, [collection, navigate]);

  if (!collection) return null;

  const collectionPresentations = collection.presentationIds
    .map((id) => presentations.find((p) => p.id === id))
    .filter(Boolean);

  const title =
    language === "en" && collection.titleEn
      ? collection.titleEn
      : collection.title;
  const description =
    language === "en" && collection.descriptionEn
      ? collection.descriptionEn
      : collection.description;

  const handleStartFirst = () => {
    if (collectionPresentations.length > 0) {
      navigate(
        `/presentation/${collectionPresentations[0]!.id}?from=${collection.id}`
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col gradient-warm">
      {/* Hero Section */}
      <header className="relative py-12 px-6">
        <div className="absolute inset-0 gradient-overlay opacity-5" />
        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t("home")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Split layout container */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left: Content */}
            <div className="flex-1 text-left space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                {title}
              </h1>
              <p className="text-primary/80 font-medium text-lg">
                {collectionPresentations.length} {t("presentations")} •{" "}
                {collection.duration} {t("minutes")}
              </p>
              <p className="text-lg text-muted-foreground font-sans leading-relaxed max-w-xl">
                {description}
              </p>
              <Button
                size="lg"
                onClick={handleStartFirst}
                className="gradient-gold hover:opacity-90 text-lg px-8 py-6 rounded-full shadow-premium transition-smooth hover:scale-105 font-sans font-semibold mt-4"
              >
                <Play className="mr-2 h-5 w-5 fill-current" />
                {t("startFromFirst")}
              </Button>
            </div>

            {/* Right: Thumbnail */}
            <div className="w-full lg:w-[45%] aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img
                src={collection.thumbnail}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Presentations List */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-foreground mb-6 mt-4">
          {t("presentations")}
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {collectionPresentations.map((presentation, index) => {
            if (!presentation) return null;
            const presTitle =
              language === "en" && presentation.titleEn
                ? presentation.titleEn
                : presentation.title;
            const presDesc =
              language === "en" && presentation.descriptionEn
                ? presentation.descriptionEn
                : presentation.description;

            return (
              <motion.div
                key={presentation.id}
                variants={itemVariants}
                className="group/pcard cursor-pointer h-full"
                onClick={() =>
                  navigate(
                    `/presentation/${presentation.id}?from=${collection.id}`
                  )
                }
              >
                <div className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:bg-card/80 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full">
                  {/* Number Badge */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm mt-1">
                    {index + 1}
                  </div>

                  {/* Thumbnail */}
                  <div className="flex-shrink-0 w-28 md:w-36 rounded-lg overflow-hidden ring-1 ring-white/10 aspect-[16/9]">
                    <img
                      src={presentation.thumbnail}
                      alt={presTitle}
                      className="w-full h-full object-cover group-hover/pcard:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="text-base md:text-lg font-semibold text-foreground leading-tight line-clamp-2 group-hover/pcard:text-primary transition-colors">
                      {presTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {presentation.slideCount} {t("slides")} •{" "}
                      {presentation.duration} {t("minutes")}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2 hidden md:block">
                      {presDesc}
                    </p>
                  </div>

                  {/* Action hint */}
                  <div className="flex-shrink-0 flex items-center">
                    <BookOpen className="w-5 h-5 text-muted-foreground/50 group-hover/pcard:text-primary transition-colors" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionDetails;
