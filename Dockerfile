FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Dependencias para produccion
FROM node:16-alpine AS production-deps
WORKDIR /app
ENV NODE_ENV production
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production --ignore-scripts --prefer-offline

FROM node:16-alpine AS production
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=builder --chown=nodejs:nodejs /app/build ./build
COPY --from=production-deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY package.json ./

USER nodejs

CMD ["yarn", "start"]