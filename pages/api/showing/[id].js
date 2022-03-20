import dbConnect from "../../../config/db";
import showingModel from "../../../models/showingModel";
import { deleted_showing } from "../../../components/Emails";
import nodeMailer from "nodemailer";

dbConnect();

const showing_dynamic_route = async (req, res) => {
	const { method, query } = req;
	const key = query.authentication;
	const id = query.id;

	switch (method) {
		case "GET":
			try {
				let prop = await showingModel.find({ propertyId: id });
				if (prop.length == 0) {
					prop = await showingModel.findById(id);

					if (!prop) {
						return res
							.status(400)
							.json({ success: false, data: [] });
					}
				}
				res.status(200).json({ success: true, data: prop });
			} catch (error) {
				res.status(400).json({ success: false, data: [] });
			}
			break;
		case "PUT":
			try {
				const prop = await showingModel.findByIdAndUpdate(
					id,
					req.body,
					{
						new: true,
						runValidators: true,
					}
				);
				if (!prop) {
					return res.status(400).json({ success: false, data: [] });
				}
				res.status(200).json({ success: true, data: prop });
			} catch (error) {
				// console.log(error);
				res.status(400).json({ success: false, data: [] });
			}
			break;
		case "DELETE":
			try {
				require("dotenv").config();
				const transporter = nodeMailer.createTransport({
					host: process.env.EMAIL_SERVER_HOST,
					port: process.env.EMAIL_SERVER_PORT,
					secure: true, // true for 465, false for other ports
					auth: {
						user: process.env.EMAIL_SERVER_USER,
						pass: process.env.EMAIL_SERVER_PASSWORD,
					},
					tls: {
						ciphers: "SSLv3",
					},
				});

				let showing = await showingModel.find({ propertyId: id });

				showing.map((el, i) => {
					const message = {
						msg: `Sorry ${el.owner} has deleted a showing you reserved from his list of availabilities, please contact him for further info`,
					};

					const mailPayload = {
						from: process.env.EMAIL_FROM,
						to: `${el.email}`,
						subject: "Showing was deleted",
						html: deleted_showing(message),
					};
					transporter.sendMail(mailPayload);
				});

				const deletedshowingModel = await showingModel.deleteMany({
					propertyId: id,
				});

				if (!deletedshowingModel) {
					return res.status(400).json({ success: false });
				}

				res.status(200).json({ success: true, data: {} });
			} catch (error) {
				// console.log(error);
				res.status(400).json({ success: false, data: [] });
			}
			break;
		default:
			res.status(400).json({ success: false, data: [] });
			break;
	}
};

export default showing_dynamic_route;
