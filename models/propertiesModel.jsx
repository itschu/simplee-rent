const mongoose = require("mongoose");

const PropSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "please add a title"],
		trim: true,
	},

	units: {
		type: String,
		required: [true, "please add units"],
		trim: true,
	},

	src: {
		type: String,
		trim: true,
	},

	fileName: {
		type: String,
		trim: true,
	},

	name: {
		type: String,
		required: [true, "please add a name"],
		trim: true,
	},

	street: {
		type: String,
		required: [true, "please add a street"],
		trim: true,
	},

	city: {
		type: String,
		required: [true, "please add a city"],
		trim: true,
	},

	country: {
		type: String,
		trim: true,
	},

	unique: {
		type: String,
		required: [true, "please add a unique id"],
		unique: true,
		trim: true,
	},

	owner: {
		type: String,
		required: [true, "please add the property owner"],
		trim: true,
	},
});

module.exports =
	mongoose.models.Properties || mongoose.model("Properties", PropSchema);
