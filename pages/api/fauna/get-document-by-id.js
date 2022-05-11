import { getDocumentById } from "../../../lib/fauna";

export default async function handler(req, res) {
	try {
		const document = await getDocumentById(
			req.body.collection,
			req.body.id
		);
		res.status(200).json(document);
	} catch (err) {
		res.status(500).json({
			message: "Error getting document",
			error: err,
		});
	}
}
