import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "./ui/button/Button";
import { Dropdown } from "./ui/dropdown/Dropdown";
import { DropdownItem } from "./ui/dropdown/DropdownItem";
import { getAssetPath } from "../lib/utils";

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const isEntreprise = location.pathname.startsWith("/entreprise");
  const isHome = location.pathname === "/" || location.pathname === "/index";
  const isPortfolio = location.pathname === "/p/portfolio";

  const baseNavLink =
    "relative px-1 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:rounded-full after:transition-all after:duration-300";
  const activeClasses = "text-mywai font-semibold after:w-full after:bg-mywai";
  const inactiveClasses =
    "text-foreground hover:text-mywai after:w-0 hover:after:w-full after:bg-mywai/60";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cream/95 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6 sm:px-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <div className="relative h-14 w-14">
            <img
              src={getAssetPath("logo-mywai-rose.png")}
              alt="Logo MyWai"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-2xl font-display font-bold text-mywai-dark">
            MyWai
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`${baseNavLink} ${isHome ? activeClasses : inactiveClasses}`}
            aria-current={isHome ? "page" : undefined}
            onClick={() => setIsMenuOpen(false)}
          >
            {t("navbar.about")}
          </Link>
          <Link
            to="/p/portfolio"
            className={`${baseNavLink} ${isPortfolio ? activeClasses : inactiveClasses}`}
            aria-current={isPortfolio ? "page" : undefined}
            onClick={() => setIsMenuOpen(false)}
          >
            {t("navbar.portfolio")}
          </Link>
          <Link
            to="/p/enterprise"
            className={`${baseNavLink} ${isEntreprise ? activeClasses : inactiveClasses}`}
            aria-current={isEntreprise ? "page" : undefined}
            onClick={() => setIsMenuOpen(false)}
          >
            Entreprise
          </Link>
          <a
            href="https://my-w.ai/session/new"
            className="text-foreground hover:text-mywai transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("navbar.account")}
          </a>

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/people/My-Wai/61581292025580/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-mywai transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/my_wai_officiel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-mywai transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/my-wai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-mywai transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => (window.location.href = "https://my-w.ai/books/new")}
            className="!bg-mywai hover:!bg-mywai-dark !text-white"
          >
            {t("navbar.try_free")}
          </Button>
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="!border-mywai !text-mywai hover:!bg-mywai hover:!text-white dropdown-toggle"
              endIcon={<ChevronDown size={16} />}
            >
              {i18n.language === "fr"
                ? "FR"
                : i18n.language === "en"
                  ? "EN"
                  : "ES"}
            </Button>
            <Dropdown
              isOpen={isLanguageDropdownOpen}
              onClose={() => setIsLanguageDropdownOpen(false)}
            >
              <DropdownItem onClick={() => changeLanguage("fr")}>
                Français
              </DropdownItem>
              <DropdownItem onClick={() => changeLanguage("en")}>
                English
              </DropdownItem>
              <DropdownItem onClick={() => changeLanguage("es")}>
                Español
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden !border-none !p-2"
          startIcon={isMenuOpen ? <X /> : <Menu />}
        >
          <span className="sr-only">Menu</span>
        </Button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-cream shadow-lg py-4">
          <div className="container mx-auto px-6 sm:px-4 flex flex-col gap-4">
            <Link
              to="/#about"
              className={`py-2 ${baseNavLink} ${isHome ? activeClasses : inactiveClasses}`}
              aria-current={isHome ? "page" : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("navbar.about")}
            </Link>
            <Link
              to="/p/portfolio"
              className={`py-2 ${baseNavLink} ${isPortfolio ? activeClasses : inactiveClasses}`}
              aria-current={isPortfolio ? "page" : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("navbar.portfolio")}
            </Link>
            <Link
              to="/p/enterprise"
              className={`py-2 ${baseNavLink} ${isEntreprise ? activeClasses : inactiveClasses}`}
              aria-current={isEntreprise ? "page" : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              Entreprise
            </Link>
            <a
              href="https://my-w.ai/session/new"
              className="text-foreground hover:text-mywai py-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("navbar.account")}
            </a>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
                setIsMenuOpen(false);
              }}
              className="!bg-mywai hover:!bg-mywai-dark !text-white w-full"
            >
              {t("navbar.try_free")}
            </Button>

            {/* Réseaux sociaux mobile */}
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-mywai/20">
              <a
                href="https://www.facebook.com/profile.php?id=61571358324990"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-mywai transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/mywai_memories/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-mywai transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/mywai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-mywai transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    changeLanguage("fr");
                    setIsMenuOpen(false);
                  }}
                  className={`px-2 py-1 text-sm rounded ${
                    i18n.language === "fr"
                      ? "bg-mywai text-white"
                      : "border border-mywai text-mywai hover:bg-mywai hover:text-white"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => {
                    changeLanguage("en");
                    setIsMenuOpen(false);
                  }}
                  className={`px-2 py-1 text-sm rounded ${
                    i18n.language === "en"
                      ? "bg-mywai text-white"
                      : "border border-mywai text-mywai hover:bg-mywai hover:text-white"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    changeLanguage("es");
                    setIsMenuOpen(false);
                  }}
                  className={`px-2 py-1 text-sm rounded ${
                    i18n.language === "es"
                      ? "bg-mywai text-white"
                      : "border border-mywai text-mywai hover:bg-mywai hover:text-white"
                  }`}
                >
                  ES
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
