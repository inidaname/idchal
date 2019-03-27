# Client App
FROM johnpapa/angular-cli as client-app
LABEL authors="Hassan Sani"
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . .
RUN ng build --prod

# Node server
FROM node:latest as node-server
WORKDIR /usr/src/app/server
COPY ["server/package.json", "server/npm-shrinkwrap.json*", "./"]
RUN npm install typescript -g

# Final image
FROM node:latest
WORKDIR /usr/src/app
RUN npm run build:server
# COPY --from=node-server /usr/src /usr/src
# COPY --from=client-app /usr/src/app/dist ./
EXPOSE 3000
# CMD ["node", "server.js"]
CMD ["npm", "start"]
