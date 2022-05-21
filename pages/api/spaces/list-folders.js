import { getFolders } from "@/lib/spaces";

export default async function handler(req, res) {
    try {
        const folders = await getFolders(
            req.body.prefix,
            process.env.DO_SPACES_BUCKET
        );
        res.status(200).json(folders);
    } catch (err) {
        res.status(500).json({
            message: "Error listing folders",
            error: err,
        });
    }
}
