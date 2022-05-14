import { getCollections } from "@/lib/fauna/collections";

export default async function handler(req, res) {
    try {
        const collections = await getCollections();
        res.status(200).json(collections);
    } catch (err) {
        res.status(500).json({
            message: "Error getting collections",
            error: err,
        });
    }
}
