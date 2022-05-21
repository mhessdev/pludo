import { createIndex } from "@/lib/fauna/indexes";

export default async function handler(req, res) {
    try {
        const index = await createIndex(req.body);

        res.status(200).json(index);
    } catch (err) {
        res.status(500).json({
            message: "Error Creating Index",
            error: err.message,
        });
    }
}
