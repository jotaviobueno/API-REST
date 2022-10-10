// Repository
import UserRepository from "../../Reposities/User/UserRepository.js";
import AuthLoginRepository from "../../Reposities/User/AuthLoginRepository.js";

// Util
import UserUtil from "../../../Utils/User/UserUtil.js";
import AuthLoginUtil from "../../../Utils/User/AuthLoginUtils.js";

// AWS SES
import SESService from "../SES/SESServices.js";

class AuthLoginServices {

	async signIn(email, password) {

		let userIp = AuthLoginUtil.userAddress();

		let user;

		if (! (user = await UserRepository.existUser(email)) )
			return { statuscode: 422, message: "email does not exist" };

		if (! await UserUtil.ComparePassword(password, user.password))
			return { statuscode: 422, message: "invalid credentials" };

		const existSession = await AuthLoginRepository.checkTheNumberOfExistingSessions(email);

		const validateIp = await AuthLoginRepository.validateIp(email, userIp);

		await AuthLoginRepository.verifySession(user.email);

		const session = await AuthLoginRepository.createSession(email, userIp);

		if ( session ) {

			if ( existSession )
				if (! validateIp )
					await SESService.alertNewLoginEmail(email, userIp, user.username );

			return { statuscode: 200, message: {
				email: session.email,
				session_id: session.session_id,
				Created_at: session.created_at
			}};
		}

		return { statuscode: 400, message: "Could not complete..." };
	}

}

export default new AuthLoginServices;