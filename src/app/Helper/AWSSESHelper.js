import { envConfig } from "../../config/storage.js";

export default function body ( email, Subject, Body ) {
	return {
		Destination: {
			CcAddresses: [
				email,
			],
			ToAddresses: [
				email,
			]
		},
		Message: {
			Subject: {
				Data: Subject,
			},
			Body: {
				Text: {
					Data: Body,
				}
			},
		},
		Source: `${envConfig.AwsEmail}`,

		ReplyToAddresses: [
			`${envConfig.AwsEmail}`
		],
	};
}