// Repository
import Repository from "../../Reposities/User/UserRepositories.js";

class UserServices {

	async store(username, email, password) {

		if ( await Repository.existUser(email) )
			return { statuscode: 422, message: "already existing email" };

		const user = await Repository.store(username, email, password); 

		if ( user )
			return { statuscode: 201, message: {
				username: user.username,
				email: user.email,
				email_verified_at: user.email_verified_at,
				created_at: user.created_at
			}};

		return { statuscode: 400, message: "unable to complete an order, please redo..." };
	}
}

export default new UserServices;