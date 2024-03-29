import dbConnect from "../../../config/db";
import availabilityModel from "../../../models/availabilityModel";

dbConnect();

const dynamic_route = async (req, res) => {
	const { method, query } = req;
	const key = query.authentication;
	const id = query.id;

	switch (method) {
		case "GET":
			try {
				const prop = await availabilityModel.findById(id);
				if (!prop) {
					return res.status(400).json({ success: false, data: [] });
				}
				res.status(200).json({ success: true, data: prop });
			} catch (error) {
				// console.log(error);
				res.status(400).json({ success: false, data: [] });
			}
			break;
		case "PUT":
			try {
				let newId = id;
				let prop;
				if (!id.match(/^[0-9a-fA-F]{24}$/)) {
					prop = await availabilityModel.updateOne(
						{ id: newId },
						{
							new: true,
							runValidators: true,
						}
					);
				} else {
					// console.log(newId); acknowledged
					prop = await availabilityModel.findByIdAndUpdate(
						newId,
						req.body,
						{
							new: true,
							runValidators: true,
						}
					);
				}

				if (!prop) {
					return res.status(400).json({ success: false, data: [] });
				}
				// console.log(prop);
				res.status(200).json({ success: true, data: prop });
			} catch (error) {
				// console.log(error);
				res.status(400).json({ success: false, data: [] });
			}
			break;
		case "DELETE":
			try {
				const deletedavailabilityModel =
					await availabilityModel.deleteOne({
						_id: id,
					});

				if (!deletedavailabilityModel) {
					return res.status(400).json({ success: false, data: [] });
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

export default dynamic_route;
