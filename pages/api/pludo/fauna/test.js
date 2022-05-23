import { createRowsIndex } from "@/lib/fauna/indexes";

export default async function handler(req, res) {
    try {
        const dbFunction = await createRowsIndex("test_Test");

        res.status(200).json(dbFunction);
    } catch (err) {
        res.status(500).json({
            message: "Error Creating Function",
            error: err,
        });
    }
}
