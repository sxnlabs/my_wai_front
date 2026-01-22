
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Blogue {
    id: string;
    title: string;
    description: string;
    published_at: string;
    slug: string;
}

const Blogues = () => {
    const [blogues, setBlogues] = useState<Blogue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogues = async () => {
            try {
                const { data, error } = await supabase
                    .from('blogues')
                    .select('*')
                    .order('published_at', { ascending: false });

                if (error) {
                    console.error('Error fetching blogues:', error);
                } else {
                    setBlogues(data || []);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogues();
    }, []);

    // Mettre à jour le titre de la page
    useEffect(() => {
        document.title = "Blog - My Wai";

        // Restaurer le titre par défaut lors du démontage
        return () => {
            document.title = "🎁 Offrez une biographie personnalisée – Livre souvenir My Wai";
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-16 bg-background">
                <div className="container max-w-4xl mx-auto px-4 space-y-8">
                    <div className="space-y-4 text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 font-display">Notre Blogue</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Découvrez nos derniers articles, conseils et actualités autour de la transmission de mémoire.
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {[1, 2, 3, 4].map((i) => (
                                <Card key={i} className="animate-pulse border-none shadow-sm h-64">
                                    <div className="h-full bg-muted/20 rounded-lg"></div>
                                </Card>
                            ))}
                        </div>
                    ) : blogues.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {blogues.map((blogue) => (
                                <Link to={`/blogue/${blogue.slug}`} key={blogue.id} className="group">
                                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-100 dark:border-gray-800 bg-card">
                                        <CardHeader>
                                            <div className="text-sm text-mywai font-medium mb-2">
                                                {format(new Date(blogue.published_at), "d MMMM yyyy", { locale: fr })}
                                            </div>
                                            <CardTitle className="line-clamp-2 text-2xl font-display group-hover:text-mywai transition-colors">
                                                {blogue.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                                                {blogue.description}
                                            </p>
                                            <div className="mt-4 text-sm font-medium text-gray-900 flex items-center gap-1">
                                                Lire l'article
                                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 px-4 bg-muted/30 rounded-2xl border border-dashed border-muted-foreground/20">
                            <h3 className="text-xl font-semibold mb-2">Aucun article pour le moment</h3>
                            <p className="text-muted-foreground">Nos plumes sont en train d'écrire... Revenez très bientôt !</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Blogues;
