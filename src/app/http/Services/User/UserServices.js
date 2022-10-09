// Repository
import Repository from "../../Reposities/User/UserRepository.js";

class UserServices {

	async store(username, email, password) {

		if ( await Repository.existUser(email) )
			return { statuscode: 422, message: "already existing email" };

		let user;

		if ( (user = await Repository.store(username, email, password)) )
			return { statuscode: 201, message: {
				username: user.username,
				email: user.email,
				email_verified_at: user.email_verified_at,
				created_at: user.created_at
			}};

		return { statuscode: 400, message: "Could not complete..." };
	}

	async profile(session_id) {
		
		let session;

		if (! (session = await Repository.existSession(session_id)) )
			return { statuscode: 422, message: "invalid session" };

		let user;

		if (! (user = await Repository.existUser(session.email)) )
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
}

export default new UserServices;