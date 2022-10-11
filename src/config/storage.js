import dotenv from "dotenv";

dotenv.config({
	path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

export const envConfig = {
	databaseURL: process.env.DATABASE_URI,
	AwsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
	AwsEmail: process.env.AWS_EMAIL,

	aws: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.REGION,
		aws_s3_bucket: process.env.AWS_S3_BUCKET
	}
};