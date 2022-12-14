// Repository
import UserRepository from "../../Reposities/User/UserRepository.js";
import AuthLoginRepository from "../../Reposities/User/AuthLoginRepository.js";
import UpdateRepository from "../../Reposities/User/UpdateRepository.js";
import AuthTokenRepository from "../../Reposities/user/AuthTokenRepository.js";

import SESServices from "../SES/SESServices.js";

import {compare, hash} from "bcrypt";

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
			return { statuscode: 403, message: "e-mail informed and invalid" };
			
		let user;

		if (! (user = await UserRepository.existUser(Token.email)) )
			return { statuscode: 422, message: "token invalid" };

		if ( Token.email === new_email )
			return { statuscode: 422, message: "you can't update the email to the same as your account" };

		const update = await UpdateRepository.updateEmail(user, new_email);

		if (update) {
			await UpdateRepository.disconnectAllSession(Token.email);
			+
			await UpdateRepository.updateToken(token);

			await UpdateRepository.createLog(Token.email, new_email, token);

			await SESServices.updateEmailAlert(Token.email, new_email);

			return { statuscode: 204, message: "" };
		}

		return { statuscode: 400, message: "Could not complete..." };
	}

	async updatePasswordByToken(token, new_password) {

		await AuthTokenRepository.checkPasswordTokenExpirationData(token);

		let Token;
		
		if (!( Token = await UpdateRepository.existPasswordToken( token ) ))
			return { statuscode: 401, message: "token invalid" };
	
		let user;

		if (! (user = await UserRepository.existUser(Token.email)) )
			return { statuscode: 422, message: "token invalid" };

		if ( await compare(new_password, user.password) )
			return  { statuscode: 422, message: "the password you are entering is the same as your account" };

		if (  await UpdateRepository.updatePassword(user.email, new_password)) {

			await UpdateRepository.createLogP(user.email, token);

			await UpdateRepository.updatePasswordToken(token);

			await UpdateRepository.disconnectAllSession(user.email);

			await SESServices.alertUpdatedPassword(Token.email);

			return { statuscode: 200, message: "password change" };
		}

		return { statuscode: 400, message: "Could not complete..." };
	}
}

export default new UpdateServices;