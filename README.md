# Fullstackchallenge


This project is a full stack [Typescript](https://typescriptlang.org) application with the server side built on Express and [Node.js](https://nodejs.org) version 10.15. Client side generated with [Angular CLI](https://cli.angular.io) version 7.3.6.

## Client Side

### Client Side Development server

Run `ng serve` for a client side only dev server. Navigate to http://localhost:4200/.

### Client Side Build

Run `ng build --prod` to build the client side only. The build artifacts will be stored in the dist/ directory.

### Running unit tests

Run `ng test` to execute the client side unit tests via Karma.

## Server side

### Server side development build

Run `npm run build:dev` to build only development server side, this will **NOT** install server dependencies.

Run `npm run build:server` to build the server side, this will install server dependencies. Navigate to `http://localhost:3000/api`
A log file is generated for review at debug.log.

## Full Build
Run `npm run build:all` to build full project. Navigate to `http://localhost:3000`.
