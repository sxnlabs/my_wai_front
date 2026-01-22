
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/button/Button";
import { ArrowLeft, Clock, Calendar, Facebook, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Blogue {
    id: string;
    title: string;
    content: string;
    published_at: string;
    image_url?: string;
    description?: string;
    author?: string;
}

const BloguePost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState<Blogue | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;

            try {
                const { data, error } = await supabase
                    .from('blogues')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) {
                    console.error('Error fetching post:', error);
                } else {
                    setPost(data);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    // Mettre à jour le titre de la page
    useEffect(() => {
        if (post) {
            document.title = `${post.title} - My Wai`;
        } else if (!loading) {
            document.title = "Article non trouvé - My Wai";
        }

        // Restaurer le titre par défaut lors du démontage
        return () => {
            document.title = "🎁 Offrez une biographie personnalisée – Livre souvenir My Wai";
        };
    }, [post, loading]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow grid place-items-center bg-cream/30">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mywai"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow grid place-items-center text-center bg-cream/30 px-4">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-display font-bold text-gray-900">Oups, article introuvable</h1>
                        <p className="text-muted-foreground">Il semble que cet article n'existe pas ou a été déplacé.</p>
                        <Link to="/blogues" className="inline-block mt-4">
                            <Button variant="primary">Retour aux articles</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Estimate reading time (rough)
    const readTime = Math.max(1, Math.ceil(post.content.split(' ').length / 200));

    return (
        <div className="min-h-screen flex flex-col bg-[#FDFBF9] dark:bg-gray-950/50">
            <Navbar />

            <main className="flex-grow pt-24">
                <div className="container max-w-3xl mx-auto py-12 px-4">

                    <Link to="/blogues" className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-mywai transition-colors mb-8">
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Retour aux articles
                    </Link>

                    {/* Hero section */}
                    <div className="space-y-6 mb-12 text-center">
                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-100 shadow-sm font-medium text-gray-600">
                                <Calendar className="h-3.5 w-3.5" />
                                {format(new Date(post.published_at), "d MMMM yyyy", { locale: fr })}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                {readTime} min de lecture
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-gray-50 leading-tight">
                            {post.title}
                        </h1>

                        {post.description && (
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                                {post.description}
                            </p>
                        )}
                    </div>

                    {/* Featured Image */}
                    {post.image_url && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-16 shadow-xl ring-1 ring-black/5">
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <article className="
                        prose prose-lg prose-slate dark:prose-invert max-w-none
                        prose-headings:font-display prose-headings:font-bold 
                        prose-h1:text-4xl prose-h1:mb-8
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-gray-900 dark:prose-h2:text-gray-100
                        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                        prose-a:text-mywai prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:border-l-4 prose-blockquote:border-mywai/50 prose-blockquote:bg-white dark:prose-blockquote:bg-gray-900/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:shadow-sm
                        prose-img:rounded-xl prose-img:shadow-lg
                        prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
                        prose-li:marker:text-mywai
                    ">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </article>

                    {/* Footer / Share */}
                    <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-mywai to-mywai-dark flex items-center justify-center text-white font-display font-bold text-lg">
                                    B
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">Écrit par Baptiste</p>
                                    <p className="text-muted-foreground">Fondateur MyWai</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-muted-foreground">Partager :</span>
                                <div className="flex gap-4">
                                    <button
                                        className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-mywai hover:text-mywai transition-all bg-white shadow-sm"
                                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                                        title="Partager sur Facebook"
                                    >
                                        <Facebook className="h-5 w-5" />
                                    </button>

                                    <button
                                        className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-mywai hover:text-mywai transition-all bg-white shadow-sm"
                                        onClick={copyToClipboard}
                                        title="Copier le lien pour Instagram"
                                    >
                                        {copied ? <Check className="h-5 w-5 text-green-600" /> : <LinkIcon className="h-5 w-5" />}
                                    </button>

                                    <button
                                        className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-mywai hover:text-mywai transition-all bg-white shadow-sm"
                                        onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`, '_blank')}
                                        title="Partager sur LinkedIn"
                                    >
                                        <Linkedin className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-20 mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                            Commencez votre histoire aujourd'hui
                        </h2>
                        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                            Ne laissez pas vos souvenirs s'effacer. Créez une biographie unique et captivante en quelques minutes avec MyWai.
                        </p>
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => window.open('https://my-w.ai/session/new', '_blank')}
                            className="text-lg px-10 py-4 h-auto !bg-mywai hover:!bg-mywai-dark shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                        >
                            Commencer mon livre
                        </Button>
                    </div>
                </div>
            </main >

            <Footer />
        </div >
    );
};

export default BloguePost;
