const mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "please add a name"],
		trim: true,
	},

	email: {
		type: String,
		required: [true, "please add an email"],
		trim: true,
	},

	phone_number: {
		type: String,
		// required: [true, "please add your phone number"],
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
		required: [true, "please add property id"],
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
