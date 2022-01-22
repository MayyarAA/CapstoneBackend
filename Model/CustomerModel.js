import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const customerSchema = new Schema(
	{
		FirstName: { type: String, required: true },
		LastName: { type: String, required: true },
		Email: { type: String, required: true },
		CustomerUserName: { type: String, required: true },
	},
	{ collection: 'Customer' }
);
customerSchema.index({ CustomerUserName: 1 }, { unique: true });
const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
