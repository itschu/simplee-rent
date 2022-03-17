import dbConnect from "../../../config/db";
import usersModel from "../../../models/usersModel";
import { hash } from "bcryptjs";
import { seriliazeInput } from "../../../data";

dbConnect();

const create_user_api_route = async (req, res) => {
	const { method, query } = req;
	const key = query.authentication;
	switch (method) {
		case "POST":
			try {
				const check = await usersModel.find({ email: req.body.email });
				// console.log(req.body.email, check);
				if (check.length > 0) {
					res.status(400).json({
						success: false,
						data: "Sorry this user already exists. We will send a login link to your mail",
					});
					return;
				}
				const props = await usersModel.create({
					name: seriliazeInput(req.body.name),
					email: seriliazeInput(req.body.email),
					// password: await hash(req.body.password, 12),
					image: process.env.DEFAULT_IMG_URL,
				});
				return res.status(200).json({
					success: true,
					data: "Congratulations, your account was created. We will send a login link to your mail",
					user: props,
				});
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, data: [] });
			}
		default:
			res.status(500).json({ message: "Route not valid" });
	}
};

export default create_user_api_route;
