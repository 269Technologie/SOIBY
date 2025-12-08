# Étape 1: Dépendances
FROM node:20-bullseye-slim AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

# Étape 2: Build
FROM node:20-bullseye-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Étape 3: Production
FROM node:20-bullseye-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copier TOUS les fichiers nécessaires
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Copier node_modules (nécessaire sans standalone)
COPY --from=builder /app/node_modules ./node_modules

# Copier le dossier .next complet
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE 3012

ENV PORT=3012
ENV HOSTNAME="0.0.0.0"

# Utiliser npm start au lieu de node server.js
CMD ["npm", "start"]
