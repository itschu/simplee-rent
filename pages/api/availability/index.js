import dbConnect from "../../../config/db";
import availabilityModel from "../../../models/availabilityModel";

dbConnect();

const availability_api = async (req, res) => {
	const { method, query } = req;
	const key = query.authentication;
	switch (method) {
		case "GET":
			try {
				const props = await availabilityModel.find({});
				res.status(200).json({ success: true, data: props });
			} catch (error) {
				res.status(400).json({ success: false, data: [] });
			}
			break;
		case "POST":
			try {
				// console.log(req.body);
				const props = await availabilityModel.create(req.body);
				res.status(200).json({ success: true, data: { ...props } });
			} catch (error) {
				// console.log(error);
				res.status(400).json({ success: false, data: [] });
			}
	}
};

export default availability_api;
