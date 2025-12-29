FROM node:24-alpine AS base

WORKDIR /app
ENV NODE_ENV=production

# Install dependencies (include dev deps to allow build), then build and prune
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
# Keep only production deps for runtime
RUN npm prune --omit=dev

EXPOSE 3000
CMD ["node", "dist/main.js"]

