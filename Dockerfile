# Using `bun` runtime: https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS ecsess-website
WORKDIR /ecsess

COPY . /ecsess
RUN bun install
RUN bun run build

EXPOSE 4173/tcp
CMD ["bun", "run", "vite", "preview", "--host"]
# ENTRYPOINT [ "bun", "run", "vite", "preview", "--host" ]