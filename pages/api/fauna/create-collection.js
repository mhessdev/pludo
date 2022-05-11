import { createCollection } from "@/lib/fauna";

export default async function handler(req, res) {
    console.log(req);
    try {
        const collection = await createCollection(
            req.body.name.replace(/[^A-Z0-9]/gi, "_")
        );
        res.status(200).json(collection);
    } catch (err) {
        res.status(500).json({
            message: "Error creating collection",
            error: err,
        });
    }
}
