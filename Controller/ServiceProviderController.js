import express from 'express';
import { ServiceProvider, Services } from '../Model/ServiceProviderModel.js';

const router = express.Router();

router.route('/').post(async (req, res) => {
	console.log('req.body ' + req.body);
	const { FirstName, LastName, Email, StoreName, Services } = req.body;
	console.log('====>> ' + Services);
	const newServiceProvider = new ServiceProvider({
		FirstName,
		LastName,
		Email,
		StoreName,
		Services,
	});

	try {
		await newServiceProvider.save();
		res.status(201).json(newServiceProvider);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});

router.route('/getStoreNames').get(async (req, res) => {
	const queryResult = await GetAllServiceProvidersService();
	if (queryResult === undefined || queryResult === null) {
		console.log('error ');
		res.status(400).json(`Error ${error}`);
		return;
	}
	console.log(JSON.stringify(queryResult));
	res.json(queryResult);
});
const GetAllServiceProvidersService = async () => {
	return await ServiceProvider.find();
};
router.route('/:storename').get(async (req, res) => {
	const storeNameValue = req.params.storename;
	//ServiceProvider
	const queryResult = await GetServiceProviderService(storeNameValue);
	// console.log(queryResult);
	if (queryResult === undefined || queryResult === null) {
		res.status(400).json(`Error ${error}`);
		return;
	}
	res.json(queryResult);
	return;
});

const GetServiceProviderService = async (storename) => {
	const result = await ServiceProvider.find({ StoreName: storename })
		.then((resultdata) => {
			return resultdata;
		})
		.catch((error) => {
			return null;
		});
	return result;
};

export { router as serviceProvidersRouter };
