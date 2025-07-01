FROM node:20-slim as build
WORKDIR /app
COPY package.json vite.config.ts tsconfig.json tsconfig.node.json index.html .
COPY src ./src
RUN npm install && npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "5173"]
