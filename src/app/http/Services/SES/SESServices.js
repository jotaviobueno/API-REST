import AWS from "aws-sdk";

import {envConfig} from "../../../../config/storage.js";
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

	async verificationEmail (email, username, uuid) {
		const params = AWSSESHelper( email, "Verification email", `Hey ${username}, to verify your account just click the link below. ${"http://localhost:3001/verify?id=" + uuid}`);

		try {
			
			await new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail( params ).promise();

			return true;

		} catch (e) {
			console.log(e);
			return false;
		}
	}

	async verifiedEmail(email) {
		const params = AWSSESHelper( email, "email verified", `${new Date()}`);

		try {
			
			await new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail( params ).promise();

			return true;

		} catch (e) {
			console.log(e);
			return false;
		}
	}

	async sendCodeToChangeEmail(email, code, expires) {
		const params = AWSSESHelper( email, "your code arrived", `${code} expires in ${expires}`);

		try {
			
			await new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail( params ).promise();

			return true;

		} catch (e) {
			console.log(e);
			return false;
		}
	}

	async updateEmailAlert(email, newEmail) {
		const params = AWSSESHelper( email, "you email changed", `your email has just been changed to ${newEmail}`);

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