import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const serviceProviderAvailability = new Schema({
	ServcieProviderId: { type: String, required: true },
	StoreName: { type: String, required: true },
	StartYear: { type: Number, required: true },
	StartMonth: { type: Number, required: true },
	StartDay: { type: Number, required: true },
	StartDateTime: { type: Date, required: true },
	EndDateTime: { type: Date, required: true },
});

serviceProviderAvailability.index(
	{ ServcieProviderId: 1, StartDateTime: 1 },
	{ unique: true }
);

const ServiceProviderAvailabilityV2 = mongoose.model(
	'ServiceProviderAvailabilityV2',
	serviceProviderAvailability
);
export { ServiceProviderAvailabilityV2 };
