const shell = require('shelljs')

shell.cp("-R", "server/package.json", "dist/package.json");
