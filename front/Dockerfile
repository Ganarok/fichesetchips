# Dockerfile
FROM node:14-alpine

# create destination directory
WORKDIR /app

ARG BACK_HOST_ARG
ARG BACK_PORT_ARG

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /app
RUN npm install
RUN chmod +x build.sh

ENV BACK_HOST=BACK_HOST_ARG
ENV BACK_PORT=BACK_PORT_ARG

RUN ./build.sh ${BACK_HOST} ${BACK_PORT}

EXPOSE 8000

CMD [ "npm", "run", "start" ]