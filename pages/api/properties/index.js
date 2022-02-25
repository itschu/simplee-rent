import dbConnect from "../../../config/db";
import propertiesModel from "../../../models/propertiesModel";

dbConnect();

const main_api_route = async (req, res) => {
	const { method, query } = req;
	const key = query.authentication;
	switch (method) {
		case "GET":
			try {
				const props = await propertiesModel.find({}).lean();
				res.status(200).json({ success: true, data: props });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case "POST":
			try {
				// console.log(req.body);
				const props = await propertiesModel.create(req.body);
				res.status(200).json({ success: true, data: props });
			} catch (error) {
				// console.log(error);
				res.status(400).json({ success: false });
			}
	}
};

export default main_api_route;
