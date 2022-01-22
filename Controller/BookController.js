import express from 'express';
import Books from '../Model/BookModel.js';
const router = express.Router();
router.route('/').get(async (req, res) => {
	try {
		const books = await Books.find();
		res.status(200).json(books);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

const postBook = async (req, res) => {
	console.log('req ' + JSON.stringify(req));
	console.log('req.body ' + req.body);
	const { Name, Price, Category, Author } = req.body;
	const newBook = new Books({ Name, Price, Category, Author });

	try {
		await newBook.save();
		res.status(201).json(newBook);
		res.send(newBook);
	} catch (error) {
		console.log(req.body.Name);
		console.log(req.body.Category);
		res.status(409).json({ message: error.message });
	}
};
router.route('/').post(async (req, res) => {
	// console.log('req ' + JSON.stringify(req));
	console.log('req.body ' + req.body);
	const { Name, Price, Category, Author } = req.body;
	const newBook = new Books({ Name, Price, Category, Author });

	try {
		await newBook.save();
		res.status(201).json(newBook);
	} catch (error) {
		console.log(req.body.Name);
		console.log(req.body.Category);
		res.status(409).json({ message: error.message });
	}
});

// router.post('/', postBook);

export { router as bookRouter };
