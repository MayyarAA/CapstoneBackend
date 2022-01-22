import express from 'express';
import Customer from '../Model/CustomerModel.js';

const router = express.Router();

router.route('/').post(async (req, res) => {
	console.log('req.body ' + req.body);
	const { FirstName, LastName, Email, CustomerUserName } = req.body;
	const newCustomer = new Customer({ FirstName, LastName, Email, CustomerUserName });

	try {
		await newCustomer.save();
		res.status(201).json(newCustomer);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});

router.route('/:userName').get(async (req, res) => {
	const userNameValue = req.params.userName;
	const queryResult = await GetCustomerService(userNameValue);
	// console.log(queryResult);
	if (queryResult === undefined || queryResult === null) {
		res.status(400).json(`Error ${error}`);
		return;
	}
	res.json(queryResult);
	return;
});

const GetCustomerService = async (userNameValue) => {
	// const userNameValue = req.params.userName;
	const result = await Customer.find({ CustomerUserName: userNameValue })
		.then((userData) => {
			return userData;
		})
		.catch((error) => {
			res.status(409).json(error);
		});
	return result;
};

export { router as customerRouter };
