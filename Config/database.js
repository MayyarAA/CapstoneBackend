import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url2 = process.env.ATLAS_URI;
const connectionParams = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
};

const connectDB = async () => {
	await mongoose
		.connect(url2, connectionParams)
		.then(() => {
			console.log('Connected to database ');
		})
		.catch((err) => {
			console.error(`Error connecting to the database. \n${err}`);
		});
};

export default connectDB;
