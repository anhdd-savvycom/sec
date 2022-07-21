# Build
FROM node:12.22.0-alpine AS build

WORKDIR /tmp

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

# Runner
FROM node:12.22.0-alpine AS runner

WORKDIR /usr/src/app

COPY --from=build /tmp/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]