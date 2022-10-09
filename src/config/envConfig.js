import dotenv from "dotenv";

dotenv.config({
	path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

export const envConfig = {
	databaseURL: process.env.DATABASE_URI,
	AwsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
	AwsEmail: process.env.AWS_EMAIL,

	firebaseConfig: {
		apiKey: process.env.apiKey,
		authDomain: process.env.authDomain,
		projectId: process.env.projectId,
		storageBucket: process.env.storageBucket,
		messagingSenderId: process.env.messagingSenderId,
		appId: process.env.appId,
		measurementId: process.env.measurementId
	},

	aws: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.REGION,
	}
};