import { google } from "googleapis";
import dbConnect from "../../../../config/db";
import calendarModel from "../../../../models/calendarModel";
dbConnect();

const oAuth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_ID,
	process.env.GOOGLE_SECRET,
	process.env.GOOGLE_URL
);

const add_to_calendar_route = async (req, res) => {
	const { method, query } = req;

	switch (method) {
		case "POST":
			try {

				const { code, eventData } = req.body;
				const evr = await oAuth2Client.getToken(code);
				const { tokens } = evr;

				const ticket = await oAuth2Client.verifyIdToken({
					idToken: tokens.id_token,
					audience: process.env.GOOGLE_ID,
				});

				const { name, email } = ticket.getPayload();

				let { refresh_token, expiry_date } = tokens;

				if (refresh_token) {
					const newToken = await calendarModel.create({
						email,
						name,
						ref_token: refresh_token,
						exp_date: expiry_date,
					});
					if (!newToken) {
						return res.status(400).json({
							success: false,
							message:
								"Sorry an error occurred, please try again later ",
						});
					}
				} else {
					const details = await calendarModel.find({ email: email });
					if (details.length < 1) {
						return res.status(400).json({
							success: false,
							data: "Sorry an error occurred, please try again later ",
						});
					}
					refresh_token = details[0].ref_token;
				}

				

				oAuth2Client.setCredentials({ refresh_token });
				const calendar = google.calendar("v3");
				const response = await calendar.events.insert({
					auth: oAuth2Client,
					calendarId: "primary",
					requestBody: { ...eventData },
				});

				res.status(200).json({ success: true, data: response });
			} catch (error) {
				// console.log(process.env.URL, error);
				res.status(400).json({
					success: false,
					message: "Sorry an error occurred, please try again later ",
				});
			}
			break;
		default:
			res.status(400).json({ success: false, data: [] });
			break;
	}
};

export default add_to_calendar_route;
