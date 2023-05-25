FROM node:18-alpine

COPY package*.json .

#MacOS python issue
RUN apk add g++ make py3-pip
RUN npm install 

COPY .env.example .env
COPY . .

EXPOSE 3000:3000

CMD [ "sh", "-c", "npm run db:refresh && npm run dev" ]