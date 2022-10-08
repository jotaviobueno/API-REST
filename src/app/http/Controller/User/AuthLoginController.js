// Services
import AuthLoginServices from "../../Services/User/AuthLoginServices.js";

class AuthLoginController {

	async SignIn(req, res) {
		const { email, password } = req.body;

		const session = await AuthLoginServices.signIn(email, password);
        
		return res.status(session.statuscode).json({ message: session.message });
	}
}

export default new AuthLoginController;