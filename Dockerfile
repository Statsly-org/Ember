FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock* ./
COPY apps ./apps
RUN yarn install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
ARG BETTER_AUTH_SECRET=build-placeholder-do-not-use-in-production
ENV BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && apk add --no-cache su-exec

COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/src ./apps/web/src

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 4553
ENV PORT=4553
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["/docker-entrypoint.sh"]
