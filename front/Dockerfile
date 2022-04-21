# Dockerfile
FROM node:14-alpine

# create destination directory
WORKDIR /app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /app
RUN npm install
RUN npm run build

EXPOSE 8000

CMD [ "yarn", "dev" ]