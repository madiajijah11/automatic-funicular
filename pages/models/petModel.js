import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: Number,
	type: String,
	breed: String,
	description: String,
});

export default mongoose.models.Pet || mongoose.model("Pet", PetSchema);
