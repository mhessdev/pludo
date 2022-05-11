import { updateDocument } from "../../../lib/fauna";

export default async function handler(req, res) {
	try {
		const { collection, id, data } = req.body;
		const document = await updateDocument(collection, id, data);
		res.status(200).json(document);
	} catch (err) {
		res.status(500).json({
			message: "Error updating document",
			error: err,
		});
	}
}
