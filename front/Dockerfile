# Dockerfile
FROM node:16-alpine as build-stage

# create destination directory
WORKDIR /app
COPY package*.json ./

ARG BACK_HOST_ARG
ARG BACK_PORT_ARG

# # update and install dependency
# RUN apk update && apk upgrade
# RUN apk add git

# copy the app
RUN npm install
COPY . .

ENV BACK_HOST=${BACK_HOST_ARG}
ENV BACK_PORT=${BACK_PORT_ARG}

# Runs custom .sh script
RUN chmod +x build.sh
RUN ./build.sh ${BACK_HOST} ${BACK_PORT}

EXPOSE 8000:8000

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf