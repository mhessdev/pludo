import { getFileList } from "../../lib/spaces";

export default async function handler(req, res) {
	try {
		const files = await getFileList(
			req.body.prefix,
			process.env.DO_SPACES_BUCKET
		);
		res.status(200).json(files);
	} catch (err) {
		res.status(500).json({
			message: "Error listing files",
			error: err.message,
		});
	}
}
