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

# Copier le code source
COPY . .

# Variables d'environnement pour le build
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
ENV CI=true
ENV DISABLE_ESLINT_PLUGIN=true

# Build de l'application avec gestion d'erreur
RUN npm run build

# Stage 2: Production
FROM nginx:alpine AS production

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers buildés depuis le stage builder
COPY --from=builder /app/build /usr/share/nginx/html

# Exposer le port
EXPOSE 80

# Sanity check
RUN ls -la /usr/share/nginx/html/

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"] 