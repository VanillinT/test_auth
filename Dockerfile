FROM node:8

WORKDIR usr/src

COPY src/package*.json ./

RUN npm install

COPY ./src .

EXPOSE 3000

CMD npm start