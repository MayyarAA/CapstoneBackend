import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reservationSchema = new Schema(
	{
		CustomerUserName: { type: String, required: true },
		StoreName: { type: String, required: true },
		DateTime: { type: Date, required: true },
		Status: { type: String, required: true },
		Note: { type: String, required: false },
	},
	{ collection: 'Reservation' }
);
reservationSchema.index({ CustomerUserName: 1, StoreName: 1 }, { unique: true });
const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
