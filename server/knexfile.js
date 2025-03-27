const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config({ path: "/app_data/.env" });
const fs = require("fs");

var USER_PASSWORD = process.env.USER_PASSWORD;
var USER_NAME = process.env.USER_NAME;
var DATABASE_PORT = process.env.DATABASE_PORT;
var DATABASE_NAME = process.env.DATABASE_NAME;

if (!USER_PASSWORD || !USER_NAME || !DATABASE_PORT || !DATABASE_NAME) {
	dotenv.config({ path: path.resolve(__dirname, "../.env") });

	USER_PASSWORD = process.env.USER_PASSWORD;
	USER_NAME = process.env.USER_NAME;
	DATABASE_PORT = process.env.DATABASE_PORT;
	DATABASE_NAME = process.env.DATABASE_NAME;
}

const HOST = fs.existsSync("/.dockerenv") == true ? "db" : "127.0.0.1";

module.exports = {
	development: {
	  client: "postgresql",
	  connection: process.env.DATABASE_URL ? process.env.DATABASE_URL : {
		host: process.env.HOST || 'localhost',
		user: process.env.USER_NAME,
		password: process.env.USER_PASSWORD,
		port: process.env.DATABASE_PORT || 5432,
		database: process.env.DATABASE_NAME,
	  },
	},
  };