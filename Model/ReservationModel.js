import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reservationSchema = new Schema(
	{
		CustomerUserName: { type: String, required: true },
		StoreName: { type: String, required: true },
		ServiceProviderId: { type: String, required: true },
		ServiceType: { type: String, required: true },
		StartYear: { type: Number, required: true },
		StartMonth: { type: Number, required: true },
		StartDay: { type: Number, required: true },
		StartDateTime: { type: Number, required: true },
		EndDateTime: { type: Number, required: true },
		//-1:denied,0:pending,1:confired
		Status: { type: Number, required: true },
		Note: { type: String, required: false },
	},
	{ collection: 'Reservation' }
);
reservationSchema.index(
	{
		CustomerUserName: 1,
		ServiceProviderId: 1,
		StartYear: 1,
		StartMonth: 1,
		StartDay: 1,
		StartDateTime: 1,
	},
	{ unique: true }
);
const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
