import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Book, Heart, Users } from "lucide-react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { getAssetPath } from "../../lib/utils";

interface BookItem {
  id: string;
  name: string;
  image: string;
  occasion: string;
  description: string;
  contributors: number;
  calameoUrl?: string;
}

const PortfolioGallery = () => {
  const { t } = useTranslation();
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const books: BookItem[] = t("portfolio.books", { returnObjects: true }) as BookItem[];

  const handleBookClick = (book: BookItem) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <section className="section-padding bg-cream relative" id="portfolio-gallery">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-mywai/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-mywai-light/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-mywai/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-mywai/10 text-mywai px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Book className="h-4 w-4" />
            {t("portfolio.badge")}
          </div>
          <h2 className="section-title">{t("portfolio.gallery_title")}</h2>
          <p className="section-subtitle">{t("portfolio.gallery_subtitle")}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-mywai mb-2">500+</div>
            <div className="text-sm text-muted-foreground">{t("portfolio.stats.books_created")}</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-mywai mb-2">5000+</div>
            <div className="text-sm text-muted-foreground">{t("portfolio.stats.contributors")}</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-mywai mb-2">98%</div>
            <div className="text-sm text-muted-foreground">{t("portfolio.stats.satisfaction")}</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-mywai mb-2">50+</div>
            <div className="text-sm text-muted-foreground">{t("portfolio.stats.pages_avg")}</div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {books.map((book, index) => (
            <div
              key={book.id || index}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              onClick={() => handleBookClick(book)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={getAssetPath(book.image)}
                  alt={`${t("portfolio.book_for")} ${book.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-flex items-center gap-1 text-white text-sm">
                    <Users className="h-4 w-4" />
                    {book.contributors} {t("portfolio.contributors")}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-lg text-foreground mb-1">{book.name}</h3>
                <p className="text-sm text-mywai font-medium mb-2">{book.occasion}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{book.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">{t("portfolio.cta_text")}</p>
          <Button
            variant="primary"
            size="md"
            endIcon={<ArrowRight className="h-4 w-4" />}
            className="!bg-mywai hover:!bg-mywai-dark !text-white shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => (window.location.href = "https://my-w.ai/books/new")}
          >
            {t("portfolio.cta_button")}
          </Button>
        </div>
      </div>

      {/* Modal pour voir les détails */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        className="max-w-4xl w-full mx-4"
        isFullscreen={false}
      >
        {selectedBook && (
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                <img
                  src={getAssetPath(selectedBook.image)}
                  alt={`${t("portfolio.book_for")} ${selectedBook.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="inline-flex items-center gap-1 text-mywai text-sm font-medium mb-2">
                  <Heart className="h-4 w-4" />
                  {selectedBook.occasion}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  {t("portfolio.book_for")} {selectedBook.name}
                </h3>
                <p className="text-muted-foreground mb-6">{selectedBook.description}</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-mywai" />
                    {selectedBook.contributors} {t("portfolio.contributors")}
                  </div>
                </div>
                {selectedBook.calameoUrl && (
                  <a
                    href={selectedBook.calameoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mywai hover:underline text-sm mb-6"
                  >
                    {t("portfolio.view_preview")}
                  </a>
                )}
                <Button
                  variant="primary"
                  size="md"
                  endIcon={<ArrowRight className="h-4 w-4" />}
                  className="!bg-mywai hover:!bg-mywai-dark !text-white"
                  onClick={() => (window.location.href = "https://my-w.ai/books/new")}
                >
                  {t("portfolio.create_similar")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default PortfolioGallery;
