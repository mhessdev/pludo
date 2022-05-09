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
	console.log(data.Contents);
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
