FROM node:16.14.2

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

RUN yarn build

EXPOSE 8000

CMD yarn start
