import dbConnect from "../../../config/db";
import showingModel from "../../../models/showingModel";
import availabilityModel from "../../../models/availabilityModel";

dbConnect();

export default async (req, res) => {
	const { method, query } = req;
	const key = query.authentication;
	const id = query.id;

	switch (method) {
		case "GET":
			try {
				const props = await availabilityModel.find({});
				res.status(200).json({ success: true, data: props });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case "POST":
			try {
				// console.log(req.body);
				const props = await showingModel.create(req.body);
				res.status(200).json({ success: true, data: props });
			} catch (error) {
				// console.log(error);
				res.status(400).json({ success: false });
			}
	}
};
