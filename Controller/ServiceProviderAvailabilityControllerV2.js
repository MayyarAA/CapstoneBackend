import express from 'express';
import { ServiceProviderAvailabilityV2 } from '../Model/ServiceProviderAvailabilityV2.js';

const router = express.Router();
router.route('/:date').get(async (req, res) => {
	const dateRequested = req.params.date;
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

	// const newAvailibility = new ServiceProviderAvailabilityV2({
	// 	ServcieProviderId,
	// 	StoreName,
	// 	StartDateTime,
	// 	EndDateTime,
	// });

	// try {
	// 	await newAvailibility.save();
	// 	res.status(201).json(newAvailibility);
	// } catch (error) {
	// 	res.status(409).json({ message: error.message });
	// }
});
export { router as serviceProviderAvailabilityRouterV2 };
