#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get asset prefix from environment variable
const assetPrefix = process.env.VITE_ASSET_PREFIX || '/';

// Lire le fichier index.html pour extraire les vrais noms des assets
const indexPath = path.join(__dirname, 'dist', 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Extraire les noms des fichiers CSS et JS
const cssMatch = indexContent.match(/href="([^"]*\.css)"/);
const jsMatch = indexContent.match(/src="([^"]*\.js)"/);

if (!cssMatch || !jsMatch) {
  console.error('❌ Impossible de trouver les assets CSS/JS dans index.html');
  process.exit(1);
}

// Apply asset prefix to the file paths
const cssFile = assetPrefix === '/' ? cssMatch[1] : assetPrefix + cssMatch[1].substring(1);
const jsFile = assetPrefix === '/' ? jsMatch[1] : assetPrefix + jsMatch[1].substring(1);

console.log('📄 Generating static HTML pages...');
console.log(`🎨 CSS: ${cssFile}`);
console.log(`⚡ JS: ${jsFile}`);

// Template de base pour les pages
const createHtmlTemplate = (title, description, ogTitle, routePath) => `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="MyWai" />

    <meta property="og:title" content="${ogTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${assetPrefix === '/' ? '/logo.png' : assetPrefix + 'logo.png'}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@mywai_officiel" />
    <meta name="twitter:image" content="${assetPrefix === '/' ? '/logo.png' : assetPrefix + 'logo.png'}" />
    
    <link rel="icon" type="image/png" href="${assetPrefix === '/' ? '/logo.png' : assetPrefix + 'logo.png'}" />
    <script type="module" crossorigin src="${jsFile}"></script>
    <link rel="stylesheet" crossorigin href="${cssFile}">
    
    <script>
      if (window.location.pathname === '${routePath}.html') {
        window.history.replaceState({}, '', '${routePath}');
      }
    </script>
  </head>

  <body>
    <div id="root"></div>
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
  </body>
  <script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '67b73b1e5699df3f800082ef' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          }
        });
      }
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>
</html>`;

// Définition des pages
const pages = [
  {
    filename: 'cgu.html',
    title: 'Conditions Générales d\'Utilisation - MyWai',
    description: 'Consultez les conditions générales d\'utilisation de MyWai, notre service de création de biographies personnalisées avec l\'IA.',
    ogTitle: 'CGU - MyWai',
    routePath: '/cgu'
  },
  {
    filename: 'mentions-legales.html',
    title: 'Mentions Légales - MyWai',
    description: 'Consultez les mentions légales de MyWai, informations sur l\'éditeur, l\'hébergeur et la propriété intellectuelle.',
    ogTitle: 'Mentions Légales - MyWai',
    routePath: '/mentions-legales'
  },
  {
    filename: 'entreprise.html',
    title: 'Solutions Entreprise - MyWai',
    description: 'Découvrez les solutions MyWai pour les entreprises : biographies personnalisées et services sur mesure pour vos équipes.',
    ogTitle: 'Solutions Entreprise - MyWai',
    routePath: '/entreprise'
  },
  {
    filename: 'portfolio.html',
    title: 'Nos Réalisations - MyWai',
    description: 'Découvrez les biographies créées avec MyWai. Parcourez notre galerie de livres personnalisés pour anniversaires, départs en retraite, hommages et autres occasions spéciales.',
    ogTitle: 'Galerie des Réalisations - MyWai',
    routePath: '/portfolio'
  },
  {
    filename: '404.html',
    title: 'Page non trouvée - MyWai',
    description: 'La page que vous recherchez n\'existe pas. Retournez à l\'accueil de MyWai pour créer votre biographie personnalisée.',
    ogTitle: 'Page non trouvée - MyWai',
    routePath: '/404'
  }
];

// Générer les fichiers HTML
pages.forEach(page => {
  const htmlContent = createHtmlTemplate(page.title, page.description, page.ogTitle, page.routePath);
  const filePath = path.join(__dirname, 'dist', page.filename);
  fs.writeFileSync(filePath, htmlContent);
  console.log(`✅ ${page.filename} généré`);
});

// Créer les fichiers de configuration
const redirectsContent = `/*    /index.html   200
/cgu              /cgu.html           200
/mentions-legales /mentions-legales.html 200
/entreprise       /entreprise.html    200
/portfolio        /portfolio.html     200
/404              /404.html           200
`;

const vercelConfig = {
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/cgu",
      "dest": "/cgu.html"
    },
    {
      "src": "/mentions-legales",
      "dest": "/mentions-legales.html"
    },
    {
      "src": "/entreprise",
      "dest": "/entreprise.html"
    },
    {
      "src": "/portfolio",
      "dest": "/portfolio.html"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
};

const htaccessContent = `RewriteEngine On

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

RewriteRule ^cgu$ /cgu.html [L]
RewriteRule ^mentions-legales$ /mentions-legales.html [L]
RewriteRule ^entreprise$ /entreprise.html [L]
RewriteRule ^portfolio$ /portfolio.html [L]

RewriteRule ^(.*)$ /index.html [L]

<FilesMatch "\\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
</FilesMatch>
`;

// Écrire les fichiers de configuration
fs.writeFileSync(path.join(__dirname, 'dist', '_redirects'), redirectsContent);
fs.writeFileSync(path.join(__dirname, 'dist', 'vercel.json'), JSON.stringify(vercelConfig, null, 2));
fs.writeFileSync(path.join(__dirname, 'dist', '.htaccess'), htaccessContent);

console.log('✅ Fichiers de configuration générés');
console.log('🚀 Ready for deployment!');
