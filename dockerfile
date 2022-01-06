FROM alpine:3.15.0

RUN apk --no-cache add nodejs npm

EXPOSE 4000

WORKDIR /dockerdir

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]