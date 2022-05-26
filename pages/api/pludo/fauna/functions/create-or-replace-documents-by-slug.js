import { createOrReplaceDocumentsBySlug } from "@/lib/fauna/functions";

export default async function handler(req, res) {
    try {
        const response = await createOrReplaceDocumentsBySlug(
            req.body.collection,
            req.body.documents
        );

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            message: "Error Upserting Documents",
            error: err,
        });
    }
}
