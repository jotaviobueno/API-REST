// Repository
import AuthLoginRepository from "../../Reposities/User/AuthLoginRepository.js";
import AuthTokenRepository from "../../Reposities/User/AuthTokenRepository.js";

import SESServices from "../SES/SESServices.js";

class AuthTokenServices {

	async generationTokenToChangeEmail(session_id) {

		let session;

		if (! (session = await AuthLoginRepository.existSession(session_id)) )
			return { statuscode: 422, message: "invalid session" };

		await AuthTokenRepository.amountOfUserTokens(session.email);

		const token = await AuthTokenRepository.generationTokenToChangeEmail(session.email);

		if (token) {
			await SESServices.sendCodeToChangeEmail(session.email, token.token, token.expires_at);

			return { statuscode: 204, message: " " };
		}

		return { statuscode: 400, message: "Could not complete..." };
	}
}

export default new AuthTokenServices;