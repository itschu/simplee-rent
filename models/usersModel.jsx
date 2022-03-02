const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
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

	image: {
		type: String,
		trim: true,
	},

	password: {
		type: String,
		trim: true,
	},

	emailVerified: {
		type: String,
		trim: true,
	},
});

module.exports = mongoose.models.users || mongoose.model("users", UsersSchema);
