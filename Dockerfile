## Multi-stage Dockerfile for Next.js standalone build
FROM node:18-alpine AS builder
WORKDIR /app

# install deps
COPY package.json package-lock.json* ./
RUN npm install

# copy source
COPY . .

# build standalone app
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

# copy only the standalone output and node_modules needed for runtime
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static

ENV NODE_ENV=production
EXPOSE 3000

# healthcheck (checks the server root)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
FROM node:18-alpine

WORKDIR /app

# install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production=false

# copy app
COPY . .

# build
RUN npm run build

EXPOSE 3000
ENV PORT=3000

CMD ["npm", "run", "start"]
