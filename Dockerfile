FROM node:18 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true \
NEW_RELIC_LOG=stdout
# Install app dependencies
RUN npm uninstall typescript
RUN npm uninstall tsc #local tsc package
RUN npm install typescript -g

RUN npm install

COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma

RUN npm run build

FROM node:18

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

ENV NEW_RELIC_NO_CONFIG_FILE=true
EXPOSE 3000
CMD [  "npm", "run", "start:migrate:prod" ]
