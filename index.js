import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './Config/database.js';
import { bookRouter } from './Controller/demoendpoints/BookController.js';
import { customerRouter } from './Controller/CustomerController.js';
import { serviceProvidersRouter } from './Controller/ServiceProviderController.js';
import { reservationsRouter } from './Controller/ReservationController.js';

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
app.use('/customers', customerRouter);
app.use('/serviceproviders', serviceProvidersRouter);
app.use('/reservations', reservationsRouter);

// res.send('Hello World!' + result);
