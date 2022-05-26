import { createCreateOrReplaceDocumentsBySlugFunction } from "@/lib/fauna/functions";

export default async function handler(req, res) {
    try {
        const dbFunction = await createCreateOrReplaceDocumentsBySlugFunction();

        res.status(200).json(dbFunction);
    } catch (err) {
        res.status(500).json({
            message: "Error Creating Function",
            error: err,
        });
    }
}
