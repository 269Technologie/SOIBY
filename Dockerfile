# Étape 1: Dépendances
FROM node:20-bullseye-slim AS deps
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances (npm install est plus tolérant que npm ci)
RUN npm install --legacy-peer-deps

# Étape 2: Build
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# Copier les dépendances depuis deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Désactiver la télémétrie Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Build de l'application Next.js
RUN npm run build

# Étape 3: Production
FROM node:20-bullseye-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Créer un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires depuis le builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Utiliser l'utilisateur non-root
USER nextjs

# Exposer le port 3012
EXPOSE 3012

# Variables d'environnement pour le port
ENV PORT=3012
ENV HOSTNAME="0.0.0.0"

# Démarrer l'application
CMD ["node", "server.js"]
