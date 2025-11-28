# Étape 1: Build
FROM node:20-bullseye-slim AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Build de l'application Vite
RUN npm run build

# Étape 2: Production avec serve
FROM node:20-bullseye-slim

WORKDIR /app

# Copier les fichiers buildés depuis le builder
COPY --from=builder /app/dist ./dist

# Installer serve globalement
RUN npm install -g serve

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application avec serve
CMD ["serve", "-s", "dist", "-l", "3000"]