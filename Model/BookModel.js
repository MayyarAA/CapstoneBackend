const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema(
	{
		Name: { type: String, required: true },
		Price: { type: Number, required: true },
		Category: { type: String, required: true },
		Author: { type: String, required: true },
	},
	{ collection: 'Books' }
);

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;
