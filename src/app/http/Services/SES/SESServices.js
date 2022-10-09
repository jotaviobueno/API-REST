import AWS from "aws-sdk";

import {envConfig} from "../../../../config/envConfig.js";
import AWSSESHelper from "../../../Helper/AWSSESHelper.js";

AWS.config.update({
	accessKeyId: envConfig.aws.accessKeyId,
	secretAccessKey: envConfig.aws.secretAccessKey,
	region: envConfig.aws.region,
	s3BucketEndpoint: false,
});

class SESServices {
	
	async welcomeEmail ( email, username ) {

		const params = AWSSESHelper( email, "Welcome <3", `Hello ${username}, welcome to our system, in case you are lost watch the video below...`);

		try {
			
			await new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail( params ).promise();

			return true;

		} catch (e) {
			console.log(e);
			return false;
		}
	}

	async alertNewLoginEmail ( email, userIp, username ) {

		const params = AWSSESHelper( email, "New login detected", `Hey ${username}, ted a new login to your account with the ip address: ${userIp} `);

		try {
			
			await new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail( params ).promise();

			return true;

		} catch (e) {
			console.log(e);
			return false;
		}
	}

}

export default new SESServices;