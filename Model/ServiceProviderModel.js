import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Services = new Schema({
	serviceId: { type: Number, required: true, unique: true },
	serviceName: { type: String, required: true, unique: true },
	serviceDescr: { type: String, required: true },
	serviceTime: { type: String, required: true },
	minPrice: { type: Number, required: true },
	maxPrice: { type: Number, required: true },
	avgPrice: { type: Number, required: false },
});

const serviceProviderSchema = new Schema(
	{
		FirstName: { type: String, required: true },
		LastName: { type: String, required: true },
		Email: { type: String, required: true },
		StoreName: { type: String, required: true },
		Services: [Services],
	},
	{ collection: 'ServiceProvider' }
);
serviceProviderSchema.index({ StoreName: 1 }, { unique: true });
const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);

export { ServiceProvider, Services };
