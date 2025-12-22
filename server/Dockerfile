FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY server ./server
RUN npm i tsx
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
CMD ["npx","tsx","server/src/index.ts"]
