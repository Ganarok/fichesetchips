# Dockerfile
FROM node:14-alpine

# create destination directory
WORKDIR /app

ARG BACK_HOST
ARG BACK_PORT

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /app
RUN npm install
RUN chmod +x build.sh
RUN echo ${BACK_HOST}
RUN echo ${BACK_PORT}
ENV b=${BACK_HOST}
ENV c=${BACK_PORT}
RUN ./build.sh ${BACK_HOST} ${BACK_PORT}

EXPOSE 8000

CMD [ "npm", "run", "start" ]