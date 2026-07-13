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

RUN npm run build

# Étape 3: Production
FROM node:20-bullseye-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist

USER nextjs

EXPOSE 3012
ENV PORT=3012
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]