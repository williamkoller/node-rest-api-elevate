FROM node:20.17-alpine

WORKDIR /app

COPY package.json /app

RUN npm cache clean --force \
    rm -rf node_modules \
    npm ci

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "start:dev"]