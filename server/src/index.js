const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config({ path: "/app_data/.env" });
const express = require("express");
const app = express();
var PORT = process.env.SERVER_PORT;
const cors = require("cors");
const knex = require("knex")(require("../knexfile")["development"]);

if (!PORT) {
	dotenv.config({ path: path.resolve(__dirname, "../../.env") });
	PORT = process.env.SERVER_PORT;
}

app.use(cors());
app.use(express.json()); 

app.get('/movies', async (req, res) => {
	try {
	  const result = await knex('movies').select('*');
	  res.json(result);  
	} catch (error) {
	  res.status(500).json({ error: 'Failed to fetch movies' });
	}
});

app.post('/movies', async (req, res) => {
	try {
		const { title } = req.body;
		await knex('movies').insert({ title });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to add movie' });
	}
});

app.delete('/movies/:id', async (req, res) => {
	try {
		const { id } = req.params;
		await knex('movies').where({ id }).del();
		res.status(200).json({ message: 'Movie deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete movie' });
	}
});




const server = app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = { app, server, PORT };
