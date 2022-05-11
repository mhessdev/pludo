import { createDocuments } from "@/lib/fauna";

export default async function handler(req, res) {
    try {
        const { collection, data } = req.body;
        const documents = await createDocuments(collection, data);
        res.status(200).json(documents);
    } catch (err) {
        res.status(500).json({
            message: "Error creating documents",
            error: err,
        });
    }
}
