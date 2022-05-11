import { getDocumentsByCollection } from "@/lib/fauna";

export default async function handler(req, res) {
    try {
        const documents = await getDocumentsByCollection(req.body.collection);
        res.status(200).json(documents);
    } catch (err) {
        res.status(500).json({
            message: "Error getting documents",
            error: err,
        });
    }
}
