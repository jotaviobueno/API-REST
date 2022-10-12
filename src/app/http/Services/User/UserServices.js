// Repository
import UserRepository from "../../Reposities/User/UserRepository.js";

// AWS SES
import SESService from "../SES/SESServices.js";
import S3Service from "../S3/S3Services.js";

class UserServices {

	async store(username, email, password) {

		if ( await UserRepository.existUser(email) )
			return { statuscode: 422, message: "already existing email" };

		let user;

		if ( (user = await UserRepository.store(username, email, password)) ) {
			const uuid = await UserRepository.EmailValidation(email);

			if ( uuid ) {
				await SESService.welcomeEmail(email, username);
				
				setTimeout(async () => {
					
					await SESService.verificationEmail(email, username, uuid.uuid);

				}, "5000");
		
				return { statuscode: 201, message: {
					username: user.username,
					email: user.email,
					email_verified_at: user.email_verified_at,
					created_at: user.created_at
				}};
			}
		}

		return { statuscode: 400, message: "Could not complete..." };
	}

	async profile(session_id) {
		
		let session;

		if (! (session = await UserRepository.existSession(session_id)) )
			return { statuscode: 422, message: "invalid session" };

		let user;

		if (! (user = await UserRepository.existUser(session.email)) )
			return { statuscode: 406, message: "email that is linked to this account is having problems..." };

		if (user) 
			return { statuscode: 201, message: {
				username: user.username,
				email: user.email,
				avatar_url: user.avatar_url,
				email_verified_at: user.email_verified_at,
				counter_code: user.counter_code,
				phone_number: user.phone_number,
				phone_verified_at: user.phone_verified_at,
				created_at: user.created_at,
				updated_at: user.updated_at
			}};

		return { statuscode: 400, message: "Could not complete..." };
	}

	async addAvatar(session_id, image_base64) {

		let session;

		if (! (session = await UserRepository.existSession(session_id)) )
			return { statuscode: 422, message: "invalid session" };

		let user;

		if (! (user = await UserRepository.existUser(session.email)) )
			return { statuscode: 406, message: "email that is linked to this account is having problems..." };

		try {
			var avatar_url = await S3Service.imageUpload(image_base64, user._id);
			
		} catch (e) {
			
			return { statuscode: 400, message: "Could not complete..." };
		}
		
		if (! avatar_url )
			return { statuscode: 400, message: "the image type is not accepted" };

		await UserRepository.addProfileAvatar(avatar_url, user.email);

		return { statuscode: 204, message: "" };
	}
}

export default new UserServices;