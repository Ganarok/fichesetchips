FROM node:lts as builder

WORKDIR /app

COPY . .

RUN yarn \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive

RUN yarn build

RUN rm -rf node_modules && \
  yarn \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive

FROM node:lts

WORKDIR /app

COPY --from=builder /app  .

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "yarn", "dev" ]
