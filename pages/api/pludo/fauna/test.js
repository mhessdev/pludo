import { buildFaunaFunctions } from "@/lib/build-scripts/new-build";

export default async function handler(req, res) {
    try {
        await buildFaunaFunctions();

        res.status(200);
    } catch (err) {
        res.status(500).json({
            message: "Error Building Functions",
            error: err,
        });
    }
}
