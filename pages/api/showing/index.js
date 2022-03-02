import dbConnect from "../../../config/db";
import showingModel from "../../../models/showingModel";
import nodeMailer from "nodemailer";
import Temp from "../../../components/Emails";
import { formatDate } from "../../../data";

dbConnect();

const showing_main_route = async (req, res) => {
	const { method, query } = req;
	// const key = query.authentication;
	const userMsg = `Congratulations ${
		req.body.name
	}, you have successfully booked a showing with ${req.body.owner} for ${
		req.body.time
	} on ${formatDate(req.body.date)}. <br /> Thank you for choosing us`;

	const ownerMsg = `Congratulations, ${
		req.body.name
	} has booked a showing with you for ${req.body.time} on ${formatDate(
		req.body.date
	)}`;

	switch (method) {
		case "GET":
			try {
				const props = await showingModel.find({});
				res.status(200).json({ success: true, data: props });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case "POST":
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

				const mailPayload = {
					from: `"Simpleerent Support", <${process.env.EMAIL_SERVER_USER}>`,
					to: `${req.body.email}`,
					subject: "Showing Created",
					html: Temp(userMsg),
				};

				const OwnerMailPayload = {
					from: '"Simpleerent Support", <chutech@gidbox.com>',
					to: `${req.body.owner}`,
					subject: "Showing Created",
					html: Temp(ownerMsg),
				};

				transporter.sendMail(mailPayload);
				transporter.sendMail(OwnerMailPayload);

				const props = await showingModel.create(req.body);
				res.status(200).json({ success: true });
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false });
			}
	}
};

export default showing_main_route;
