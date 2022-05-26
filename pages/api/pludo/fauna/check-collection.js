import { checkCollection } from "@/lib/fauna/collections";

export default async function handler(req, res) {
    try {
        const bool = await checkCollection(req.body.collection);

        res.status(200).json(bool);
    } catch (err) {
        res.status(500).json({
            message: "Error Checking For Collection",
            error: err,
        });
    }
}
