import { IncomingForm } from "formidable";
import { getSession } from "next-auth/react";
import fs from "fs";
import path from "path";

export const config = {
	api: {
		bodyParser: false,
	},
};

const upload_api = async (req, res) => {
	const session = await getSession({ req });
	const { method, query } = req;
	const key = query.authentication;
	const id = query.id;
	const form = new IncomingForm();
	const base = process.cwd();

	const uploadFolder = path.join(
		base,
		"public",
		"images",
		"properties",
		session.user.email
	);
	switch (method) {
		case "POST":
			try {
				form.parse(req, (err, fields, files) => {
					if (!fs.existsSync(uploadFolder)) {
						fs.mkdirSync(uploadFolder);
					}
					const oldpath = files.file[0].filepath;
					const newFileName = files.file[0].originalFilename.replace(
						/\s/g,
						"_"
					);
					const newpath = `${uploadFolder}/${newFileName}`;
					fs.rename(oldpath, newpath, function (err) {
						if (err) {
							console.log(error);
							throw err;
							return res.status(400).json({ success: false });
						}
					});
				});
				return res.status(200).json({ success: true });
			} catch (error) {
				// console.log(error);
			}
			break;
		default:
			return res.status(400).json({ success: false });
	}
};

export default upload_api;
