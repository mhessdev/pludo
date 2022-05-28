import AWS from "aws-sdk";

const s3Client = new AWS.S3({
    endpoint: process.env.DO_REGION_ENDPOINT,
    region: "nyc3",
    credentials: {
        accessKeyId: process.env.DO_ACCESS_KEY_ID,
        secretAccessKey: process.env.DO_SPACES_SECRET,
    },
});

export async function getFileList(prefix, bucket) {
    const params = {
        Bucket: bucket,
        MaxKeys: 1000,
        Prefix: prefix,
        Delimiter: "/",
    };

    const data = await s3Client.listObjectsV2(params).promise();
    const files = data.Contents.filter((obj) => obj?.Size != 0);
    const imagePaths = files.map((file) => file.Key);

    return imagePaths;
}

export async function getFolders(prefix, bucket) {
    let folders = [];

    const params = {
        Bucket: bucket,
        MaxKeys: 1000,
        Prefix: prefix,
        Delimiter: "/",
    };

    const data = await s3Client.listObjectsV2(params).promise();
    for (let i = 0; i < data.CommonPrefixes.length; i++) {
        folders.push(data.CommonPrefixes[i].Prefix);
    }

    return folders;
}

export async function purgeExtensions(prefix, bucket) {
    const params = {
        Bucket: bucket,
        MaxKeys: 10000,
        Prefix: prefix,
    };

    const data = await s3Client.listObjectsV2(params).promise();
    const files = data.Contents.filter((obj) => obj?.Size != 0);
    const imagePaths = files.map((file) => file.Key);

    let newPaths = [];
    let newObjects = [];

    for (let i = 0; i < imagePaths.length; i++) {
        if (imagePaths[i].includes(".png")) {
            newPaths.push(imagePaths[i].replace(".png", ""));
            try {
                let newObjectData = await s3Client
                    .copyObject({
                        Bucket: bucket,
                        CopySource: `${bucket}/${imagePaths[i]}`,
                        Key: imagePaths[i].replace(".png", ""),
                        ACL: "public-read",
                    })
                    .promise();

                newObjects.push(newObjectData);

                await s3Client
                    .deleteObject({
                        Bucket: bucket,
                        Key: imagePaths[i],
                    })
                    .promise();
            } catch (err) {
                console.log(err);
            }
        }
    }

    return [imagePaths, newPaths, newObjects];
}
