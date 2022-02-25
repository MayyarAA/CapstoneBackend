import express from 'express';
import Customer from '../Model/CustomerModel.js';
import bcrypt from 'bcrypt';
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

const hashPasswordHelper = async (passwordUnHashed) => {
	const hashedPassword = await bcrypt.hash(passwordUnHashed, 10);
	return hashedPassword;
};

router.route('/registercustomer').post(async (req, res) => {
	console.log('req.body ' + req.body);
	const { FirstName, LastName, Email, CustomerUserName, CustomerPassword } = req.body;
	console.log(JSON.stringify(req.body));
	// let hashPassword = await hashPasswordHelper(CustomerPassword);
	setTimeout(() => {}, 10000);
	// console.log(hashPassword);
	const newCustomer = new Customer({
		FirstName,
		LastName,
		Email,
		CustomerUserName,
		CustomerPassword,
	});

	try {
		await newCustomer.save();
		res.status(201).json(newCustomer);
	} catch (error) {
		console.log('errpr');
		res.status(409).json({ message: error.message });
	}
});

router.route('/logincustomer').get(async (req, res) => {
	const { userName, password } = req.body;
	return retreiveCustomerService(userName, password, res);
});

const retreiveCustomerService = async (userName, password, res) => {
	if (userName == undefined || userName == null) {
		console.log('here in retreiveCustomerService');
		return res.status(400).json({ message: 'error' });
	}

	await Customer.findOne({ CustomerUserName: userName })
		.then((userData) => {
			checkPasswordMatchingService(userData, password, res);
			return;
		})
		.catch((error) => {
			res.status(400).json(error);
			return;
		});
};
const checkPasswordMatchingService = (userData, password, res) => {
	if (userData.CustomerPassword !== password) return res.status(400).send('wrong pwd');
	console.log('here in checkPasswordMatchingService');
	return res.status(200).send('successful login');
};
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
