const mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema({
	tenant: {
		type: String,
		required: [true, "please add a title"],
		trim: true,
	},

	email: {
		type: String,
		required: [true, "please add units"],
		trim: true,
	},

	duration: {
		type: String,
		trim: true,
	},

	date: {
		type: String,
		trim: true,
	},

	time: {
		type: String,
		required: [true, "please add a name"],
		trim: true,
	},

	propertyId: {
		type: String,
		required: [true, "please add a street"],
		trim: true,
	},

	owner: {
		type: String,
		required: [true, "please add the property owner"],
		trim: true,
	},
});

module.exports =
	mongoose.models.Showings || mongoose.model("Showings", ShowSchema);
