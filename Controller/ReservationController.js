import express from 'express';
import Reservation from '../Model/ReservationModel.js';

const router = express.Router();

router.route('/').post(async (req, res) => {
	console.log('req.body ' + req.body);
	const { CustomerUserName, StoreName, DateTime, Status, Note } = req.body;
	const newReservation = new Reservation({
		CustomerUserName,
		StoreName,
		DateTime,
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

router.route('/:reservationid').get(async (req, res) => {
	const reservationidValue = req.params.reservationid;
	const queryResult = await GetReservationService(reservationidValue);
	console.log('queryResult ' + JSON.stringify(queryResult));
	if (queryResult === undefined || queryResult === null) {
		res.status(400).json(`Error ${error}`);
		return;
	}

	res.json(queryResult);
	return;
});

const GetReservationService = async (reservationid) => {
	const result = await Reservation.find({ _id: reservationid })
		.then((resultdata) => {
			console.log('resultdata ' + JSON.stringify(resultdata));
			return resultdata;
		})
		.catch((error) => {
			return res.status(400).json(`Error ${error}`);
		});
	return result;
};

export { router as reservationsRouter };
