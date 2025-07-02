FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* tsconfig.json vite.config.ts ./
RUN npm install --omit=dev || true
COPY . .
CMD ["npm", "run", "dev"]
