import AWS from "aws-sdk";
import {envConfig} from "../../../../config/storage.js";
import bluebird from "bluebird";

class S3Services {

	async imageUpload (base64, userId) {
		AWS.config.setPromisesDependency(bluebird);
		AWS.config.update({ accessKeyId: envConfig.aws.accessKeyId, secretAccessKey: envConfig.aws.secretAccessKey, region: envConfig.aws.region });
      
		if (base64) {
			const s3 = new AWS.S3();
			const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
			const type = base64.split(";")[0].split("/")[1];
	
			if ( type === "png" || type === "jpeg") {
				const params = {
					Bucket: envConfig.aws.aws_s3_bucket,
					Key: `avatar/${userId}/${Date.now()}.${type}`,
					Body: base64Data,
					ACL: "public-read",
					ContentEncoding: "base64",
					ContentType: `image/${type}`
				};
	
				let location = "";
				let key = "";
				
				try {
					const { Location, Key } = await s3.upload(params).promise();
					location = Location;
					key = Key;
			
				} catch (error) {
					console.log(error);
				}

				return location;
			}
		}
		return false;
	} 
}

export default new S3Services;