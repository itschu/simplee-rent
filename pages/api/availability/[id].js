import dbConnect from "../../../config/db";
import availabilityModel from "../../../models/availabilityModel";

dbConnect();

export default async (req, res) => {
	const { method, query } = req;
	const key = query.authentication;
	const id = query.id;

	switch (method) {
		case "GET":
			try {
				const prop = await availabilityModel.findById(id);
				if (!prop) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: prop });
			} catch (error) {
				// console.log(error);
				res.status(400).json({ success: false });
			}
			break;
		case "PUT":
			try {
				const prop = await availabilityModel.findByIdAndUpdate(
					id,
					req.body,
					{
						new: true,
						runValidators: true,
					}
				);
				if (!prop) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: prop });
			} catch (error) {
				// console.log(error);
				res.status(400).json({ success: false });
			}
			break;
		case "DELETE":
			try {
				const deletedavailabilityModel =
					await availabilityModel.deleteOne({
						_id: id,
					});

				if (!deletedavailabilityModel) {
					return res.status(400).json({ success: false });
				}

				res.status(200).json({ success: true, data: {} });
			} catch (error) {
				// console.log(error);
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};
