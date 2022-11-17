# Dockerfile
FROM node:16-alpine

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

EXPOSE 8000

CMD [ "npm", "run", "start" ]