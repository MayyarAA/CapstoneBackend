import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const serviceProviderAvailability = new Schema({
	ServcieProviderId: { type: String, required: true },
	StoreName: { type: String, required: true },
	StartYear: { type: Number, required: true },
	StartMonth: { type: Number, required: true },
	StartDay: { type: Number, required: true },
	StartDateTime: { type: Number, required: true },
	EndDateTime: { type: Number, required: true },
});

serviceProviderAvailability.index(
	{ StoreName: 1, ServcieProviderId: 1, StartYear: 1, StartMonth: 1, StartDay: 1 },
	{ unique: true }
);

const ServiceProviderAvailability = mongoose.model(
	'ServiceProviderAvailability',
	serviceProviderAvailability
);
export { ServiceProviderAvailability };
