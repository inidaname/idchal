const shell = require('shelljs')

shell.cp("-R", "server/package.json", "dist/package.json");
shell.cp("-R", "server/.env.example", "dist/.env");
