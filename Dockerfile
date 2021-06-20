FROM node:14-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY ./package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "start:prod"]