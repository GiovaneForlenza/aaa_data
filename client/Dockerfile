FROM node:latest as builder

WORKDIR /app/
COPY . /app/

RUN sed -i s#https://aaa-data.herokuapp.com#http://localhost:8080# /app/src/App.js 

RUN npm install \
    && npm run build

FROM nginx:latest


COPY --from=builder /app/build /usr/share/nginx/html
