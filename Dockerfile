FROM oven/bun:1.1.2

ENV NODE_ENV=production
WORKDIR /app

COPY ./package*.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . .

CMD ["bun", "run", "start:prod"]