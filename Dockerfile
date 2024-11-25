FROM node:lts-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app/integration-service
WORKDIR /app/integration-service

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/integration-service/node_modules /app/integration-service/node_modules
COPY --from=build /app/integration-service/build /app/integration-service/build

EXPOSE 3000
CMD ["pnpm", "start"]
