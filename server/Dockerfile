FROM node:latest as builder


WORKDIR /app/
COPY . /app/

RUN npm install
CMD ["node", "index.js", "0.0.0.0"]