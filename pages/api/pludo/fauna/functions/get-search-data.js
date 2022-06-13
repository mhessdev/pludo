import { getSearchData } from "@/lib/fauna/functions";

export default async function handler(req, res) {
    try {
        const rows = await getSearchData();
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({
            message: "Error Retrieving Rows",
            error: err,
        });
    }
}
