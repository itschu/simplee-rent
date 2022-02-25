import dbConnect from "../../../config/db";
import showingModel from "../../../models/showingModel";
import nodeMailer from "nodemailer";
import Temp from "../../../components/Emails";
import { formatDate } from "../../../data";

dbConnect();

const showing_main_route = async (req, res) => {
	const { method, query } = req;
	// const key = query.authentication;

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
				const userMsg = `Congratulations ${
					req.body.name
				}, you have successfully booked a showing with ${
					req.body.owner
				} for ${req.body.time} on ${formatDate(
					req.body.date
				)}. <br /> Thank you for choosing us`;
				const ownerMsg = `Congratulations, ${
					req.body.name
				} has booked a showing with you for ${
					req.body.time
				} on ${formatDate(req.body.date)}`;
				require("dotenv").config();
				const transporter = nodeMailer.createTransport({
					host: "gidbox.com",
					port: 465,
					secure: true, // true for 465, false for other ports
					auth: {
						user: "chutech@gidbox.com",
						pass: "Thenewpass14",
					},
					tls: {
						ciphers: "SSLv3",
					},
				});

				const mailPayload = {
					from: "chutech@gidbox.com",
					to: `${req.body.email}`,
					subject: "Showing Created",
					html: Temp(userMsg),
				};

				const OwnerMailPayload = {
					from: "chutech@gidbox.com",
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
