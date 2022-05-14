import { createIndex } from "@/lib/fauna";

export default async function handler(req, res) {
    try {
        const {
            collection,
            name,
            terms,
            values,
            unique,
            serialized,
            permissions,
            data,
        } = req.body;

        const index = await createIndex(
            collection,
            name,
            terms,
            values,
            unique,
            serialized,
            permissions,
            data
        );
        res.status(200).json(index);
    } catch (err) {
        res.status(500).json({
            message: "Error Creating Index",
            error: err.message,
        });
    }
}
