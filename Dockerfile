FROM node:alpine

WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY ./.env ./

RUN npm run build
RUN npm install -g serve


CMD ["serve", "-l", "4444", "-s", "build"]