# Étape 1 : Build Expo Web
FROM node:20-bullseye-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Build web (Expo export)
RUN npx expo export --platform web

# Étape 2 : Serveur web
FROM node:20-bullseye-slim

WORKDIR /app

RUN npm install -g serve

# Copier seulement le build web
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Servir la version web exportée
CMD ["serve", "-s", "dist", "-l", "3000"]
