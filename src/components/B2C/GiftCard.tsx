import { Gift, Check, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../ui/button/Button";

const GiftCard = () => {
  const { t } = useTranslation();

  const features = t("gift_card_section.features", {
    returnObjects: true,
  }) as string[];

  return (
    <section className="py-12 md:py-16 bg-cream relative" id="gift-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-mywai/10 to-mywai-light/20 rounded-2xl p-1">
            <div className="bg-white rounded-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                {/* Left side - Icon and title */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-mywai/10 rounded-full mb-4">
                    <Gift className="w-8 h-8 text-mywai" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-mywai">
                    {t("gift_card_section.title")}
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {t("gift_card_section.subtitle")}
                  </p>
                </div>

                {/* Middle - Description and features */}
                <div className="flex-1">
                  <p className="text-muted-foreground mb-4 text-sm md:text-base">
                    {t("gift_card_section.description")}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-mywai mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right side - Price and CTA */}
                <div className="flex-shrink-0 text-center">
                  <div className="mb-3">
                    <span className="text-4xl font-display font-bold text-mywai">
                      {t("gift_card_section.price")}
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    endIcon={<ArrowRight className="h-4 w-4" />}
                    onClick={() =>
                      (window.location.href = "https://my-w.ai/gift-card")
                    }
                    className="!bg-mywai hover:!bg-mywai-dark !text-white whitespace-nowrap"
                  >
                    {t("gift_card_section.cta_button")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftCard;
