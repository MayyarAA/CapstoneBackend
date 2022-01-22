import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './Config/database.js';
import { bookRouter } from './Controller/BookController.js';
// const express = require('express');
const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(PORT, () => {
	console.log(`Example app listening at http://localhost:${PORT}`);
});

connectDB();

app.use('/books', bookRouter);
// res.send('Hello World!' + result);
//test get call to DB
