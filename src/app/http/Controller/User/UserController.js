// Services
import UserServices from "../../Services/User/UserServices.js";

class UserController {

	async signUp(req, res) {
		const { username, email, password } = req.body;

		const user = await UserServices.store(username, email, password);

		return res.status(user.statuscode).json({ message: user.message });
	}

	async profile(req, res) {
		const { session_id } = req.headers;
		
		const profile = await UserServices.profile(session_id);

		return res.status(profile.statuscode).json({ message: profile.message });
	}
}

export default new UserController;