FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production --ignore-scripts

COPY . .

EXPOSE ${PORT}
CMD [ "npm", "start" ]