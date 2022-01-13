FROM node:16-alpine

EXPOSE ${PORT}

WORKDIR /dockerdir

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD [ "npm", "start" ]