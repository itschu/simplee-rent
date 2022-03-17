import dbConnect from "../../../config/db";
import usersModel from "../../../models/usersModel";

dbConnect();

const showing_dynamic_route = async (req, res) => {
	const { method, query } = req;
	const id = query.email;

	switch (method) {
		case "GET":
			try {
				const prop = await usersModel.find({ email: id });

				if (prop.length < 1) {
					return res.status(400).json({
						success: false,
						data: "This user does not exist please sign up",
					});
				}
				if (prop[0]?.emailVerified !== undefined) {
					if (prop[0]?.emailVerified == null) {
						return res.status(400).json({
							success: false,
							data: "Please sign in with the correct method of this account",
						});
					}
				}

				res.status(200).json({
					success: true,
					data: "This user exists, proceed with login",
				});
			} catch (error) {
				res.status(400).json({
					success: false,
					data: "Sorry an error occurred, please try again later",
				});
			}
			break;
		default:
			res.status(400).json({ success: false, data: [] });
			break;
	}
};

export default showing_dynamic_route;
