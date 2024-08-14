--- npm init -y  
--- npm i express
-- npm i nodemon
npm install jsonwebtoken
npm install bcrypt
--- npm install dotenv
--- npm install cors
npm install mongoose
---- node app.js
console-ninja node --watch app.js

https://signup.heroku.com/account --- for deployment

npm install prisma // it is used for connection bewteen db and api and we create a model

npx prisma init --datasource-provider "DBNAME" (Try again with "postgresql", "mysql", "sqlite", "sqlserver", "mongodb" or "cockroachdb"
npm i @prisma/client

npx prisma db push // for change in schema file

npm i cookie-parser // for generate cookie

node -e "console.log(require('crypto').randomBytes(32).toString('base64'));" // for generate jwt_secret_key
npx prisma generate and npx prisma db push
