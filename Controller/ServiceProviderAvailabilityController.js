import express from 'express';
import { ServiceProviderAvailability } from '../Model/ServiceProviderAvailability.js';

const router = express.Router();
router.route('/get/:spid').get(async (req, res) => {
	const svId = req.params.spid;
	const yearRequested = req.body.StartYear;
	const monthRequested = req.body.StartMonth;
	const dayRequested = req.body.StartDay;

	await ServiceProviderAvailability.find({
		ServcieProviderId: svId,
		StartYear: yearRequested,
		StartMonth: monthRequested,
		StartDay: dayRequested,
	})
		.then((userData) => {
			if (
				userData == null ||
				userData == undefined ||
				Object.keys(userData).length === 0 ||
				userData.length == 0
			) {
				res.status(404).json('No record found');
				return;
			}
			res.status(200).json(userData);
			return;
		})
		.catch((error) => {
			res.status(400).json(error);
			return;
		});
});

router.route('/add').post(async (req, res) => {
	const {
		ServcieProviderId,
		StoreName,
		StartYear,
		StartMonth,
		StartDay,
		StartDateTime,
		EndDateTime,
	} = req.body;
	const newAvailibility = new ServiceProviderAvailability({
		ServcieProviderId,
		StoreName,
		StartYear,
		StartMonth,
		StartDay,
		StartDateTime,
		EndDateTime,
	});

	try {
		await newAvailibility.save();
		res.status(201).json(newAvailibility);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});
export { router as serviceProviderAvailabilityRouter };
