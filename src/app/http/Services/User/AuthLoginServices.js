// Repository
import UserRepository from "../../Reposities/User/UserRepository.js";
import AuthLoginRepository from "../../Reposities/User/AuthLoginRepository.js";

// Util
import UserUtil from "../../../Utils/User/UserUtil.js";

class AuthLoginServices {

	async signIn(email, password) {
        
		let user;

		if (! (user = await UserRepository.existUser(email)) )
			return { statuscode: 422, message: "email does not exist" };

		if (! await UserUtil.ComparePassword(password, user.password))
			return { statuscode: 422, message: "invalid credentials" };

		const session = await AuthLoginRepository.createSession(email);

		if ( session )
			return { statuscode: 200, message: {
				email: session.email,
				session_id: session.session_id,
				Created_at: session.created_at
			}};

		return { statuscode: 400, message: "Could not complete..." };
	}

}

export default new AuthLoginServices;