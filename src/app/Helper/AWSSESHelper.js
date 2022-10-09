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
		Source: `${process.env.AWS_EMAIL}`,

		ReplyToAddresses: [
			`${process.env.AWS_EMAIL}`
		],
	};
}