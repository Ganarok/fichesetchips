# Dockerfile
FROM node:18.14.1-bullseye-slim

# create destination directory
WORKDIR /app
COPY package*.json .

# copy the app
RUN npm install
COPY . .

EXPOSE 8080:8080

CMD [ "npm", "run", "dev" ]
