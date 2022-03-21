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
	const more = query.more;
	const form = new IncomingForm();
	const base = process.cwd();

	const uploadFolder =
		more == "profile"
			? path.join(
					base,
					"public",
					"images",
					"properties",
					session.user.email,
					"profile"
			  )
			: path.join(
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

					fs.readdir(uploadFolder, (err, files) => {
						for (const file of files) {
							fs.unlink(
								path.join(uploadFolder, file),
								(err) => {}
							);
						}
					});

					fs.rename(oldpath, newpath, function (err) {
						if (err) {
							throw err;
							return res
								.status(400)
								.json({ success: false, data: [] });
						}
					});
				});

				return res.status(200).json({ success: true });
			} catch (error) {
				// console.log(error);
			}
			break;
		default:
			return res.status(400).json({ success: false, data: [] });
	}
};

export default upload_api;
