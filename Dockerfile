# Client App
FROM johnpapa/angular-cli as client-app
LABEL authors="Hassan Sani"
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
RUN npm install typescript -g
COPY . .
RUN ng build --prod --optimization && cd server && npm install && cd ../ && npm run build:server


# Node server
FROM mongo as node-server
WORKDIR /usr/src/app/server
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=root

# Running mongo command
RUN mkdir ~/db && mkdir ~/db/data

# Final image
FROM node:latest
WORKDIR /usr/src/app
# RUN npm run build:server
# COPY --from=node-server /usr/src /usr/src
COPY --from=client-app /usr/src/app/dist ./
EXPOSE 3000
# CMD ["node", "server.js"]
CMD ["npm", "start"]
