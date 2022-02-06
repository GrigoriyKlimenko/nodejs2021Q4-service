FROM node:16-alpine AS builder

WORKDIR /dockerdir

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

FROM node:16-alpine

COPY . .
COPY --from=builder /dockerdir/node_modules ./node_modules
COPY --from=builder /dockerdir/package*.json ./

# RUN npm install
# COPY . .
# EXPOSE 4000
COPY --from=builder /dockerdir/dist ./dist

EXPOSE 4000
# CMD ["node", "dist/main"]
CMD [ "npm", "run", "start" ]