# Dockerfile multi-stage pour DreamWeaver Studio
# Stage 1: Build
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système nécessaires
RUN apk add --no-cache git

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer TOUTES les dépendances (dev + prod nécessaires pour le build)
RUN npm ci --silent

# Copier tout le contenu
COPY . .

# Debug : vérifier ce qui a été copié
RUN echo "=== DEBUG: Contenu copié ===" && \
    ls -la && \
    echo "=== public/ existe ? ===" && \
    ls -la public/ || echo "ERREUR: public/ n'existe pas" && \
    echo "=== src/ existe ? ===" && \
    ls -la src/ || echo "ERREUR: src/ n'existe pas"

# Variables d'environnement pour le build
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
ENV CI=true
ENV DISABLE_ESLINT_PLUGIN=true

# Build de l'application avec gestion d'erreur
RUN npm run build

# Stage 2: Production
FROM nginx:alpine AS production

# Installer envsubst pour les variables d'environnement
RUN apk add --no-cache gettext

# Copier le template de configuration nginx
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Copier les fichiers buildés depuis le stage builder
COPY --from=builder /app/build /usr/share/nginx/html

# Script de démarrage qui remplace les variables d'environnement
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Exposer le port (sera défini par Railway)
EXPOSE $PORT

# Démarrer avec le script personnalisé
CMD ["/start.sh"] 