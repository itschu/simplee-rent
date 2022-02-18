const mongoose = require("mongoose");

const AvailabilitySchema = new mongoose.Schema({
	id: {
		type: String,
		required: [true, "please add an id"],
		trim: true,
	},

	display_time: {
		type: String,
		trim: true,
	},

	date: {
		type: Array,
		trim: true,
	},

	duration: {
		type: Array,
		trim: true,
	},

	link: {
		type: String,
		trim: true,
	},

	property: {
		type: String,
		trim: true,
	},

	time: {
		type: Array,
		trim: true,
	},

	unique: {
		type: String,
		trim: true,
	},

	owner: {
		type: String,
		required: [true, "please add the property owner"],
		trim: true,
	},
});

module.exports =
	mongoose.models.Availability ||
	mongoose.model("Availability", AvailabilitySchema);
