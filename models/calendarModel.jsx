const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema({
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

	ref_token: {
		type: String,
		required: [true, "please add a ref token"],
		trim: true,
	},

	exp_date: {
		type: String,
		required: [true, "please add an expiry date"],
		trim: true,
	},
});

module.exports =
	mongoose.models.calendar_tokens ||
	mongoose.model("calendar_tokens", CalendarSchema);
