import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema(
	{
		FirstName: { type: String, required: true },
		LastName: { type: String, required: true },
		Email: { type: String, required: true },
		StoreName: { type: String, required: true },
	},
	{ collection: 'ServiceProvider' }
);
serviceProviderSchema.index({ StoreName: 1 }, { unique: true });
const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);

export default ServiceProvider;
