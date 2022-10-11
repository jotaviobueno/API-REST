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

	async addAvatar(req, res) {
		const { image_base64 } = req.body;
		const { session_id } = req.headers;

		const avatar = await UserServices.addAvatar(session_id, image_base64);

		return res.status(avatar.statuscode).json({ message: avatar.message });
	}
}

export default new UserController;