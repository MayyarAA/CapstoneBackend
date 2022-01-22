import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reservationSchema = new Schema(
	{
		CustomerUserName: { type: String, required: true },
	},
	{ collection: 'Reservation' }
);
reservationSchema.index({ CustomerUserName: 1, StoreName: 1 }, { unique: true });
const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
