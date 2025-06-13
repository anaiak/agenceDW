#!/bin/sh

# Définir le port par défaut si non défini
export PORT=${PORT:-8080}

echo "Starting nginx on port $PORT"

# Remplacer la variable PORT dans le template nginx
envsubst '${PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Vérifier la configuration nginx
nginx -t

# Démarrer nginx
exec nginx -g 'daemon off;' 