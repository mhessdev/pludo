import { mergeUpsertBySlug } from "@/lib/fauna/functions";

export default async function handler(req, res) {
    try {
        const response = await mergeUpsertBySlug(
            req.body.collection,
            req.body.documents
        );

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            message: "Error Merge-Upserting Documents",
            error: err,
        });
    }
}
