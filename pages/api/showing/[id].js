import dbConnect from "../../../config/db";
import showingModel from "../../../models/showingModel";

dbConnect();

const showing_dynamic_route = async (req, res) => {
	const { method, query } = req;
	const key = query.authentication;
	const id = query.id;

	switch (method) {
		case "GET":
			try {
				const prop = await showingModel.findById(id);

				if (!prop) {
					return res.status(400).json({ success: false });
				}

				res.status(200).json({ success: true, data: prop });
			} catch (error) {
				res.status(400).json({ success: false });
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
				const deletedshowingModel = await showingModel.deleteMany({
					propertyId: id,
				});

				if (!deletedshowingModel) {
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

export default showing_dynamic_route;
