FROM node:16

WORKDIR /var/www

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD node server.js
