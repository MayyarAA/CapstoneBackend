import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const serviceProviderAvailability = new Schema({
	ServcieProviderId: { type: String, required: true },
	StoreName: { type: String, required: true },
	StartDateTime: { type: Date, required: true },
	EndDateTime: { type: Date, required: true },
});

serviceProviderAvailability.index(
	{ StoreName: 1, ServcieProviderId: 1, StartDateTime: 1 },
	{ unique: true }
);

const ServiceProviderAvailability = mongoose.model(
	'ServiceProviderAvailability',
	serviceProviderAvailability
);
export { ServiceProviderAvailability };
