import { createDocument } from "@/lib/fauna";

export default async function handler(req, res) {
    const { collection, data } = req.body;
    try {
        const document = await createDocument(collection, data);
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({
            message: "Error creating document",
            error: error,
        });
    }
}
