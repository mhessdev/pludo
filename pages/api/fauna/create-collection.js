import { createCollection } from "../../../lib/fauna";

export default async function handler(req, res) {
	try {
		const collection = await createCollection(req.body.name);
		res.status(200).json(collection);
	} catch (err) {
		res.status(500).json({
			message: "Error creating collection",
			error: err.message,
		});
	}
}
