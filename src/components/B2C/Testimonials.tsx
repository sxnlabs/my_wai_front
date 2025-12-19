import { useTranslation } from "react-i18next";
import Avatar from "../ui/avatar/Avatar";
import Badge from "../ui/badge/Badge";
import { getAssetPath } from "../../lib/utils";

const Testimonials = () => {
  const { t } = useTranslation();

  // Only use the 3 specified testimonials
  const testimonials = [
    {
      content: "« Pour ses 45 ans, on voulait faire un truc vraiment différent. On a réuni les souvenirs de ses amis, de ses potes d'école, de ses ex, même de ses collègues ! Le résultat : un livre drôle, tendre, touchant, complètement à son image. Il a ri, il a pleuré, et il l'a relu trois fois dans la semaine. »",
      author: "Élodie M.",
      role: "amie de longue date"
    },
    {
      content: "« Le jour de son pot de départ, on lui a remis le livre devant toute l'équipe. Il l'a feuilleté, a reconnu les messages, les anecdotes… et il s'est arrêté net. Il avait les larmes aux yeux. C'est le genre de cadeau qu'on n'oublie pas. Même les collègues les plus sceptiques ont été bluffés par la qualité et la sensibilité du résultat. »",
      author: "Julien T.",
      role: "Chef de projet"
    },
    {
      content: "« J'ai offert ce livre à ma mère pour ses 70 ans. Elle a versé des larmes de joie en lisant tous les témoignages de ses amis et de sa famille. C'est un cadeau qui l'accompagnera toute sa vie. »",
      author: "Marie L.",
      role: "Pour l'anniversaire de sa mère"
    }
  ];

  // Media logos
  const mediaLogos = [
    { name: "actu.fr", color: "#1e88e5" },
    { name: "Le Télégramme", color: "#d32f2f" },
    { name: "TVR", color: "#7b1fa2" },
    { name: "Ouest-France", color: "#e65100" },
    { name: "France 3", color: "#0288d1" },
    { name: "7 Jours", color: "#388e3c" }
  ];

  // Mapping des photos pour chaque auteur B2C
  const getAuthorPhoto = (author: string) => {
    const photoMap: { [key: string]: string } = {
      "Élodie M.": "1. Elodie Martin.png",
      "Julien T.": "1. Julien Thomas .png",
      "Marie L.": "1. Marie Laurent .png",
    };

    return photoMap[author] || null;
  };

  // Get initials from author name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <section className="relative" id="testimonials">
      <div className="flex flex-col lg:flex-row min-h-[800px]">
        {/* LEFT COLUMN - Testimonials */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-pink-100 via-pink-50 to-white py-16 px-6 md:px-12 lg:px-16">
          <div className="max-w-xl mx-auto lg:mx-0 lg:ml-auto lg:mr-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-4">
              {t("testimonials_section.title")}
            </h2>
            <p className="text-[#666666] text-lg mb-10">
              {t("testimonials_section.subtitle")}
            </p>

            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Quote icon */}
                  <div className="mb-3 text-[#e91e63]">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 32 32"
                      fill="currentColor"
                    >
                      <path d="M9.33333 21.3333C7.86667 21.3333 6.66667 20.8 5.73333 19.7333C4.8 18.6667 4.33333 17.3333 4.33333 15.7333C4.33333 14 4.93333 12.3333 6.13333 10.7333C7.33333 9.13333 9.06667 7.86667 11.3333 6.93333L12.6667 8.8C11.0667 9.46667 9.8 10.2667 8.86667 11.2C7.93333 12.1333 7.46667 13.0667 7.46667 14C7.46667 14.2667 7.53333 14.5333 7.66667 14.8C7.8 15.0667 8 15.2 8.26667 15.2C8.6 15.2 9.13333 15.0667 9.86667 14.8C10.6 14.5333 11.2667 14.4 11.8667 14.4C13 14.4 14 14.8 14.8667 15.6C15.7333 16.4 16.1333 17.3333 16.1333 18.5333C16.1333 19.7333 15.6667 20.6667 14.7333 21.6C13.8 20.7333 12.6667 21.3333 11.3333 21.3333ZM20.6667 21.3333C19.2 21.3333 18 20.8 17.0667 19.7333C16.1333 18.6667 15.6667 17.3333 15.6667 15.7333C15.6667 14 16.2667 12.3333 17.4667 10.7333C18.6667 9.13333 20.4 7.86667 22.6667 6.93333L24 8.8C22.4 9.46667 21.1333 10.2667 20.2 11.2C19.2667 12.1333 18.8 13.0667 18.8 14C18.8 14.2667 18.8667 14.5333 19 14.8C19.1333 15.0667 19.3333 15.2 19.6 15.2C19.9333 15.2 20.4667 15.0667 21.2 14.8C21.9333 14.5333 22.6 14.4 23.2 14.4C24.3333 14.4 25.3333 14.8 26.2 15.6C27.0667 16.4 27.4667 17.3333 27.4667 18.5333C27.4667 19.7333 27 20.6667 26.0667 21.6C25.1333 20.7333 24 21.3333 22.6667 21.3333Z" />
                    </svg>
                  </div>
                  <p className="text-[#2c2c2c] italic text-sm md:text-base leading-relaxed mb-5">
                    {testimonial.content}
                  </p>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={getAuthorPhoto(testimonial.author)
                          ? getAssetPath(getAuthorPhoto(testimonial.author)!)
                          : `https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.author}`
                        }
                        alt={testimonial.author}
                        size="small"
                      />
                      <div>
                        <h4 className="font-semibold text-[#2c2c2c]">{testimonial.author}</h4>
                        <p className="text-sm text-[#666666]">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <Badge variant="light" color="success" size="sm" className="!bg-pink-100 !text-[#e91e63]">
                      {t("testimonials_section.verified")} ✓
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Media Logos */}
        <div className="w-full lg:w-1/2 bg-[#f5f2f0] py-16 px-6 md:px-12 lg:px-16 relative overflow-hidden">
          {/* My Wai Logo in top right */}
          <div className="absolute top-6 right-6 opacity-20">
            <img
              src={getAssetPath("logo_mywai_no_bg.png")}
              alt="My Wai"
              className="w-24 h-24 object-contain"
            />
          </div>

          <div className="max-w-xl mx-auto lg:mx-0 lg:mr-auto lg:ml-8 relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-12 text-center">
              Ils parlent de nous
            </h2>

            {/* Media logos grid */}
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {mediaLogos.map((media, index) => {
                // Alternate tilts for visual interest
                const rotations = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1', '-rotate-1', 'rotate-2'];
                const rotation = rotations[index % rotations.length];

                return (
                  <div
                    key={index}
                    className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform ${rotation} hover:rotate-0 hover:scale-105`}
                  >
                    <div className="flex items-center justify-center h-16">
                      <span
                        className="font-display font-bold text-lg md:text-xl"
                        style={{ color: media.color }}
                      >
                        {media.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Decorative pink accent in bottom right */}
          <div className="absolute bottom-8 right-8 w-16 h-16 bg-[#e91e63] rounded-full opacity-20"></div>
          <div className="absolute bottom-4 right-20 w-8 h-8 bg-[#e91e63] rounded-full opacity-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
