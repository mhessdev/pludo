import AWS from "aws-sdk";
import formidable from "formidable";
import fs from "fs";
// import { ImagePool } from "@squoosh/lib";

export const config = {
    api: {
        bodyParser: false,
    },
};

const s3Client = new AWS.S3({
    endpoint: process.env.DO_REGION_ENDPOINT,
    region: "nyc3",
    credentials: {
        accessKeyId: process.env.DO_ACCESS_KEY_ID,
        secretAccessKey: process.env.DO_SPACES_SECRET,
    },
});

export default async function handler(req, res) {
    const promise = new Promise((resolve, reject) => {
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(500).json({
                    message: "Error uploading file",
                    error: err,
                });
                return;
            }

            const images = files.images;
            const promises = [];
            for (let i = 0; i < images.length; i++) {
                //const imagePool = new ImagePool(cpus().length);
                const file = images[i];
                const fileName = file.originalFilename.replace(
                    /[^A-Z0-9]+/gi,
                    "_"
                );
                const filePath = file.filepath;
                try {
                    const fileBuffer = fs.readFileSync(filePath);
                    //const image = imagePool.ingestImage(fileBuffer);
                    // await image.encode({
                    //     webp: {},
                    // });
                    //const { extension, binary } = await image.encodedWith.webp;

                    // const compressedImage = fs.writeFileSync(
                    //     `./public/output.${extension}`,
                    //     binary,
                    //     (err, result) => {
                    //         if (err) console.log("error", err);
                    //     }
                    // );

                    // const compressedFileBuffer = fs.readFileSync(
                    //     `./public/output.${extension}`
                    // );

                    // const presignedPost = await s3Client
                    //     .createPresignedPost({
                    //         Bucket: process.env.DO_SPACES_BUCKET,
                    //         Key: `images/${fileName}`,
                    //         Fields: {
                    //             Bode: binary,
                    //             ContentType: `image/${extension}`,
                    //         },
                    //         Expires: 60,
                    //     })
                    //     .promise();

                    const params = {
                        Bucket:
                            process.env.DO_SPACES_BUCKET + "/Images/Uploads",
                        Key: fileName,
                        Body: fileBuffer,
                        ContentType: "image/" + file.extension,
                        ACL: "public-read",
                    };
                    // await imagePool.close();
                    promises.push(s3Client.putObject(params).promise());
                } catch (err) {
                    console.log(err);
                    res.status(500).json({
                        message: "Error uploading file",
                        error: err,
                    });
                    return;
                }
            }
            await Promise.all(promises);
            resolve(images);
        });
    });

    return promise.then(() => {
        res.status(200).json({
            message: "File(s) uploaded",
        });
    });
}
