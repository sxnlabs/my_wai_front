import { lazy } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LazyWrapper from "../components/ui/loading/LazyWrapper";
import LoadingSpinner from "../components/ui/loading/LoadingSpinner";
import Button from "../components/ui/button/Button";
import { ArrowRight, Book, Sparkles } from "lucide-react";
import { getAssetPath } from "../lib/utils";

const PortfolioGallery = lazy(() => import("../components/B2C/PortfolioGallery"));

const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-cream to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-mywai/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-mywai-light/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-mywai/10 text-mywai px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              {t("portfolio.hero_badge")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              {t("portfolio.hero_title")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t("portfolio.hero_subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="md"
                endIcon={<ArrowRight className="h-4 w-4" />}
                className="!bg-mywai hover:!bg-mywai-dark !text-white shadow-lg"
                onClick={() => (window.location.href = "https://my-w.ai/books/new")}
              >
                {t("portfolio.hero_cta")}
              </Button>
              <Button
                variant="outline"
                size="md"
                startIcon={<Book className="h-4 w-4" />}
                className="!border-mywai !text-mywai hover:!bg-mywai hover:!text-white"
                onClick={() => {
                  const gallery = document.getElementById("portfolio-gallery");
                  gallery?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("portfolio.hero_cta_secondary")}
              </Button>
            </div>
          </div>

          {/* Featured Books Preview */}
          <div className="mt-16 flex justify-center gap-4 md:gap-8">
            <div className="w-24 h-32 md:w-32 md:h-44 rounded-lg shadow-xl overflow-hidden transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <img
                src={getAssetPath("1. Marie Laurent .png")}
                alt="Exemple livre Marie"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-28 h-36 md:w-36 md:h-48 rounded-lg shadow-xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300 z-10">
              <img
                src={getAssetPath("1. Alain Girard.png")}
                alt="Exemple livre Alain"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-24 h-32 md:w-32 md:h-44 rounded-lg shadow-xl overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <img
                src={getAssetPath("1. Clara Petit.png")}
                alt="Exemple livre Clara"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <LazyWrapper
        minHeight="800px"
        fallback={
          <div className="section-padding bg-cream flex items-center justify-center">
            <LoadingSpinner size="lg" text="Chargement de la galerie..." />
          </div>
        }
      >
        <PortfolioGallery />
      </LazyWrapper>

      {/* Testimonial Section */}
      <section className="section-padding bg-white relative">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-mywai/5 to-mywai-light/10 rounded-2xl p-8 md:p-12">
            <blockquote className="text-xl md:text-2xl font-display text-center text-foreground mb-6">
              "{t("portfolio.testimonial_quote")}"
            </blockquote>
            <div className="text-center">
              <p className="font-semibold text-foreground">{t("portfolio.testimonial_author")}</p>
              <p className="text-sm text-muted-foreground">{t("portfolio.testimonial_role")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-mywai relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mywai to-mywai-dark"></div>
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              {t("portfolio.final_cta_title")}
            </h2>
            <p className="text-lg text-white/80 mb-8">
              {t("portfolio.final_cta_subtitle")}
            </p>
            <Button
              variant="outline"
              size="md"
              endIcon={<ArrowRight className="h-4 w-4" />}
              className="!bg-white !text-mywai hover:!bg-cream !border-white shadow-lg"
              onClick={() => (window.location.href = "https://my-w.ai/books/new")}
            >
              {t("portfolio.final_cta_button")}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
