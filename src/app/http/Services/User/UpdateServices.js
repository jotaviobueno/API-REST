// Repository
import UserRepository from "../../Reposities/User/UserRepository.js";
import AuthLoginRepository from "../../Reposities/User/AuthLoginRepository.js";
import UpdateRepository from "../../Reposities/User/UpdateRepository.js";
import AuthTokenRepository from "../../Reposities/user/AuthTokenRepository.js";

import SESServices from "../SES/SESServices.js";

class UpdateServices {

	async updateName(session_id, newName) {

		let session;

		if (! ( session = await AuthLoginRepository.existSession(session_id)) )
			return { statuscode: 406, message: "invalid session" };

		let user;

		if (! (user = await UserRepository.existUser(session.email)) )
			return { statuscode: 422, message: "email that is linked to this account is having problems..." };

		if ( user.username === newName )
			return;

		const update = await UpdateRepository.updateName(user, newName);

		if ( update )
			return { statuscode: 200, message: {
				email: update.email,
				new_name: update.new_name,
				old_name: update.old_name,
				updated_at: update.updated_at
			}};

		return { statuscode: 400, message: "Could not complete..." };
	}

	async updateEmail(token, new_email) {

		await AuthTokenRepository.checkTokenExpirationData(token);
		
		let Token;
		
		if (!( Token = await UpdateRepository.existToken( token ) ))
			return { statuscode: 401, message: "token invalid" };
		
		if ( await UserRepository.existUser(new_email) )
			return { statuscode: 422, message: "email não pode ser atualizado pois o email informando e invalido" };
			
		let user;

		if (! (user = await UserRepository.existUser(Token.email)) )
			return { statuscode: 422, message: "token invalido" };

		if ( Token.email === new_email )
			return;

		const update = await UpdateRepository.updateEmail(user, new_email);

		if (update) {
			await UpdateRepository.disconnectAllSession(Token.email);

			await UpdateRepository.updateToken(token);

			await UpdateRepository.createLog(Token.email, new_email, token);

			await SESServices.updateEmailAlert(Token.email, new_email);

			return { statuscode: 204, message: "" };
		}

		return { statuscode: 400, message: "Could not complete..." };
	}
}

export default new UpdateServices;