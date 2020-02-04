FROM node:8.10.0-alpine

RUN apk update && apk add ffmpeg && rm -rf /var/cache/apk/*
RUN mkdir /app

COPY . /app

WORKDIR "/app"

RUN npm install

CMD npm start