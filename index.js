const connectDB = require('./Config/database');
const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(PORT, () => {
	console.log(`Example app listening at http://localhost:${PORT}`);
});

connectDB();
const bookRouter = require('./Controller/BookController');
app.use('/books', bookRouter);
// res.send('Hello World!' + result);
//test get call to DB
