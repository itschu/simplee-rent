import dbConnect from "../../../config/db";
import showingModel from "../../../models/showingModel";
import nodeMailer from "nodemailer";
import Temp from "../../../components/Emails";
import { formatDate, seriliazeInput } from "../../../data";

dbConnect();

const showing_main_route = async (req, res) => {
	const { method, query } = req;
	// const key = query.authentication;
	// console.log(req.body.email);

	switch (method) {
		case "GET":
			try {
				const props = await showingModel.find({});
				res.status(200).json({ success: true, data: props });
			} catch (error) {
				res.status(400).json({ success: false, data: [] });
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

				const resp = await fetch(`${process.env.URL}api/availability`, {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				});
				const { data } = await resp.json();
				const isAvailabilityValid = data.filter(
					(el) => el.id == req.body.propertyId
				);
				if (isAvailabilityValid.length == 0) {
					return res
						.status(400)
						.json({ success: false, msg: "availability deleted" });
				}

				const newShowing = await showingModel.create({
					...req.body,
					name: seriliazeInput(req.body.name),
					email: seriliazeInput(req.body.email),
					phone_number: seriliazeInput(req.body.phone_number),
				});
				if (!newShowing) {
					return res.status(400).json({ success: false, data: [] });
				}

				const userMsg = {
					msg: `Congratulations ${
						req.body.name
					}, you have successfully booked a showing with ${
						req.body.owner
					} for ${req.body.time} on ${formatDate(req.body.date)}.`,
					url: `${process.env.URL}showings/calendar/${req.body.email}?&id=${req.body.propertyId}&showingId=${newShowing?._id}&owner=${req.body.owner}`,
				};

				const ownerMsg = {
					msg: `Congratulations, ${
						req.body.name
					} has booked a showing with you for ${
						req.body.time
					} on ${formatDate(req.body.date)}.`,
					url: `${process.env.URL}showings/calendar/${req.body.owner}?&id=${req.body.propertyId}&showingId=${newShowing?._id}&owner=${req.body.owner}`,
				};

				const mailPayload = {
					// from: `"Simpleerent Support", <${process.env.EMAIL_SERVER_USER}>`,
					from: process.env.EMAIL_FROM,
					to: `${req.body.email}`,
					subject: "Showing Created",
					html: Temp(userMsg),
				};

				const OwnerMailPayload = {
					// from: '"Simpleerent Support", <chutech@gidbox.com>',
					from: process.env.EMAIL_FROM,
					to: `${req.body.owner}`,
					subject: "Showing Created",
					html: Temp(ownerMsg),
				};

				await transporter.sendMail(mailPayload);
				transporter.sendMail(OwnerMailPayload);

				res.status(200).json({ success: true });
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, data: [] });
			}
	}
};

export default showing_main_route;
