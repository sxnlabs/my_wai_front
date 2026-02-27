import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../ui/button/Button";
import { getAssetPath } from "../../lib/utils";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24"
      id="about"
    >
      {/* Background Elements */}
      <div className="absolute -top-10 right-0 w-96 h-96 bg-mywai/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-mywai-light/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div
            className="space-y-8 text-center lg:text-left lg:col-span-7 animate-fade-in-up"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight">
              {t("hero.title")}
              <br />
              <span className="text-mywai">{t("hero.title_highlight")}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t("hero.subtitle")}
              <br />
              {t("hero.description")}
              <br />
              <br />
              <span className="font-medium text-foreground" dangerouslySetInnerHTML={{ __html: t("hero.cta") }} />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="lg"
                endIcon={<ArrowRight className="h-5 w-5" />}
                onClick={() =>
                  (window.location.href = "https://app.my-w.ai/books/new")
                }
                className="!bg-mywai hover:!bg-mywai-dark !text-white shadow-lg shadow-mywai/25 hover:shadow-xl hover:shadow-mywai/30 transition-all transform hover:-translate-y-1"
              >
                {t("hero.cta_primary")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const calameoSection = document.getElementById("calameo");
                  calameoSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="!border-2 !border-mywai !text-mywai hover:!bg-mywai/5 backdrop-blur-sm transition-all transform hover:-translate-y-1"
              >
                {t("hero.cta_secondary")}
              </Button>

            </div>
          </div>

          <div className="relative lg:col-span-5 perspective-1000">
            <div className="relative z-10 animate-float duration-3000">
              <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl p-4 transform rotate-2 max-w-md mx-auto transition-transform hover:rotate-0 duration-500">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-inner">
                  <img
                    src={getAssetPath("GIF-MyWai.gif")}
                    alt="Démonstration de l'application My Wai"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="bg-mywai/10 p-2 rounded-full">
                    <svg className="w-5 h-5 text-mywai" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg leading-none text-foreground">
                      {t("hero.first_chapter_free")}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">
                      {t("hero.no_commitment")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-radial from-mywai-light/30 to-transparent blur-3xl -z-10"></div>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/50 hover:shadow-md hover:border-mywai/20 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-mywai/10 rounded-xl flex items-center justify-center group-hover:bg-mywai group-hover:text-white transition-colors duration-300">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-mywai group-hover:text-white transition-colors">
                  <path d="M20,4 L20,20 L4,20 L4,4 L20,4 Z M18,8 L6,8 L6,18 L18,18 L18,8 Z M10,10 L14,10 L14,12 L10,12 L10,10 Z M8,14 L16,14 L16,16 L8,16 L8,14 Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold mb-1 text-foreground">
                  {t("hero.feature1_title")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("hero.feature1_description")}
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/50 hover:shadow-md hover:border-mywai/20 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-mywai/10 rounded-xl flex items-center justify-center group-hover:bg-mywai group-hover:text-white transition-colors duration-300">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-mywai group-hover:text-white transition-colors">
                  <path
                    d="M12,2 L12,22 M17,4 L17,20 M7,4 L7,20 M3,8 L21,8 M3,16 L21,16"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold mb-1 text-foreground">
                  {t("hero.feature2_title")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("hero.feature2_description")}
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/50 hover:shadow-md hover:border-mywai/20 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-mywai/10 rounded-xl flex items-center justify-center group-hover:bg-mywai group-hover:text-white transition-colors duration-300">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-mywai group-hover:text-white transition-colors">
                  <path
                    d="M4,4 L20,4 L20,20 L4,20 L4,4 Z M8,2 L8,6 M16,2 L16,6 M4,9 L20,9"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold mb-1 text-foreground">
                  {t("hero.feature3_title")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("hero.feature3_description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
