import dbConnect from "../../../config/db";
import propertiesModel from "../../../models/propertiesModel";

dbConnect();

const properties_dynamic_route = async (req, res) => {
	const { method, query } = req;
	const key = query.authentication;
	const id = query.id;

	switch (method) {
		case "GET":
			try {
				const prop = await propertiesModel.findById(id);

				if (!prop) {
					return res.status(400).json({ success: false, data: []  });
				}

				res.status(200).json({ success: true, data: prop });
			} catch (error) {
				res.status(400).json({ success: false, data: []  });
			}
			break;
		case "PUT":
			try {
				const prop = await propertiesModel.findByIdAndUpdate(
					id,
					req.body,
					{
						new: true,
						runValidators: true,
					}
				);
				if (!prop) {
					return res.status(400).json({ success: false, data: []  });
				}
				res.status(200).json({ success: true, data: prop });
			} catch (error) {
				// console.log(error);
				res.status(400).json({ success: false, data: []  });
			}
			break;
		case "DELETE":
			try {
				const deletedpropertiesModel = await propertiesModel.deleteOne({
					_id: id,
				});

				if (!deletedpropertiesModel) {
					return res.status(400).json({ success: false, data: []  });
				}

				res.status(200).json({ success: true, data: {} });
			} catch (error) {
				res.status(400).json({ success: false, data: []  });
			}
			break;
		default:
			res.status(400).json({ success: false, data: []  });
			break;
	}
};

export default properties_dynamic_route;
