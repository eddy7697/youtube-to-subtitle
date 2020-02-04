FROM node:8.10.0-alpine

RUN apk update && apk add ffmpeg && rm -rf /var/cache/apk/*
RUN npm install pm2 -g
RUN mkdir /app

COPY . /app

WORKDIR "/app"

RUN npm install

CMD pm2 start bin/www