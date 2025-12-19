import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Hero from '../components/B2C/Hero';
import LazyWrapper from '../components/ui/loading/LazyWrapper';
import LoadingSpinner from '../components/ui/loading/LoadingSpinner';
import Footer from '../components/Footer';

// Lazy load des composants lourds
const Process = lazy(() => import('../components/B2C/Process'));
const ExampleCalameo = lazy(() => import('../components/B2C/ExampleCalameo'));
const Pricing = lazy(() => import('../components/B2C/Pricing'));
const Testimonials = lazy(() => import('../components/B2C/Testimonials'));
const FAQ = lazy(() => import('@/components/FAQ'));

const Index = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <LazyWrapper 
        minHeight="400px"
        fallback={
          <div className="section-padding bg-white flex items-center justify-center">
            <LoadingSpinner size="lg" text="Chargement du processus..." />
          </div>
        }
      >
        <Process />
      </LazyWrapper>
      
      <LazyWrapper 
        minHeight="600px"
        fallback={
          <div className="section-padding bg-cream flex items-center justify-center">
            <LoadingSpinner size="lg" text="Chargement de la démonstration..." />
          </div>
        }
      >
        <ExampleCalameo />
      </LazyWrapper>
      
      <LazyWrapper
        minHeight="800px"
        fallback={
          <div className="flex items-center justify-center min-h-[800px] bg-[#f5f2f0]">
            <LoadingSpinner size="lg" text="Chargement des témoignages..." />
          </div>
        }
      >
        <Testimonials />
      </LazyWrapper>
      
      <LazyWrapper 
        minHeight="500px"
        fallback={
          <div className="section-padding bg-cream flex items-center justify-center">
            <LoadingSpinner size="lg" text="Chargement des tarifs..." />
          </div>
        }
      >
        <Pricing />
      </LazyWrapper>
      
      <LazyWrapper 
        minHeight="400px"
        fallback={
          <div className="section-padding bg-white flex items-center justify-center">
            <LoadingSpinner size="lg" text="Chargement des questions fréquentes..." />
          </div>
        }
      >
        <FAQ />
      </LazyWrapper>
      
      <Footer />
      
      {/* <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-mywai text-white rounded-full flex items-center justify-center shadow-lg hover:bg-mywai-dark transition-colors z-50"
        title={t('back_to_top')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button> */}
    </div>
  );
};

export default Index;
