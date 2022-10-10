// Repository
import UserRepository from "../../Reposities/User/UserRepository.js";
import AuthLoginRepository from "../../Reposities/User/AuthLoginRepository.js";
import UpdateRepository from "../../Reposities/User/UpdateRepository.js";


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
}

export default new UpdateServices;