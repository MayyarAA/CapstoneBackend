import express from 'express';
import Reservation from '../Model/ReservationModel.js';

const router = express.Router();

router.route('/add/reservation/request').post(async (req, res) => {
	console.log('req.body ' + req.body);
	const {
		CustomerUserName,
		StoreName,
		ServiceProviderId,
		ServiceType,
		StartYear,
		StartMonth,
		StartDay,
		StartDateTime,
		EndDateTime,
		Status,
		Note,
	} = req.body;
	const newReservation = new Reservation({
		CustomerUserName,
		StoreName,
		ServiceProviderId,
		ServiceType,
		StartYear,
		StartMonth,
		StartDay,
		StartDateTime,
		EndDateTime,
		Status,
		Note,
	});

	try {
		await newReservation.save();
		res.status(201).json(newReservation);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});

router.route('/get/serviceprovider/:userId').get(async (req, res) => {
	const userId = req.params.userId;
	const queryResult = await GetReservationSVService(userId);
	console.log('queryResult ' + JSON.stringify(queryResult));
	if (queryResult === undefined || queryResult === null) {
		res.status(400).json(`Error ${error}`);
		return;
	}

	res.json(queryResult);
	return;
});

router.route('/get/customer/:userId').get(async (req, res) => {
	const userId = req.params.userId;
	const queryResult = await GetReservationCustomerService(userId);
	console.log('queryResult ' + JSON.stringify(queryResult));
	if (queryResult === undefined || queryResult === null) {
		res.status(400).json(`Error ${error}`);
		return;
	}

	res.json(queryResult);
	return;
});

router.route('/patch/serviceprovider/').patch(async (req, res) => {
	updateReservationStatusService(req, res);
});

const updateReservationStatusService = async (req, res) => {
	const {
		ServiceProviderId,
		CustomerUserName,
		StartYear,
		StartMonth,
		StartDay,
		StartDateTime,
		Status,
	} = req.body;
	console.log('ServiceProviderId => ' + ServiceProviderId + ' Status=> ' + Status);
	const filter = {
		ServiceProviderId: ServiceProviderId,
		CustomerUserName: CustomerUserName,
		StartYear: StartYear,
		StartMonth: StartMonth,
		StartDay: StartDay,
		StartDateTime: StartDateTime,
	};
	const updateRequest = { Status: Status };
	Reservation.findOneAndUpdate(filter, updateRequest, { new: true }, (error, result) => {
		console.log(error);
		if (error !== null) {
			console.log(result);
			res.status(404).send('error');
			return;
		}

		res.status(201).json(result);
		return;
	});
};

const GetReservationCustomerService = async (userId) => {
	const result = await Reservation.find({ CustomerUserName: userId })
		.then((resultdata) => {
			if (
				resultdata == null ||
				resultdata == undefined ||
				Object.keys(resultdata).length === 0 ||
				resultdata.length == 0
			) {
				res.status(404).json('No record found');
				return;
			}
			console.log('resultdata ' + JSON.stringify(resultdata));
			return resultdata;
		})
		.catch((error) => {
			return res.status(400).json(`Error ${error}`);
		});
	return result;
};

const GetReservationSVService = async (userId) => {
	const result = await Reservation.find({ ServiceProviderId: userId })
		.then((resultdata) => {
			if (
				resultdata == null ||
				resultdata == undefined ||
				Object.keys(resultdata).length === 0 ||
				resultdata.length == 0
			) {
				res.status(404).json('No record found');
				return;
			}
			console.log('resultdata ' + JSON.stringify(resultdata));
			return resultdata;
		})
		.catch((error) => {
			return res.status(400).json(`Error ${error}`);
		});
	return result;
};

export { router as reservationsRouter };
