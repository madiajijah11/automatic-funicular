import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error("MONGODB_URI is not defined");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { connect: null, promise: null };
}

async function mongoDbConnect() {
	if (cached.connect) {
		return cached.connect;
	}
	if (!cached.promise) {
		const options = {
			bufferCommands: false,
		};
		cached.promised = mongoose.connect(MONGODB_URI, options).then((mongoose1) => {
			return mongoose1;
		});
	}
	cached.con = await cached.promised;
	return cached.con;
}

export default mongoDbConnect;
