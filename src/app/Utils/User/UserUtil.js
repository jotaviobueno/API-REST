import bcrypt from "bcrypt";

class UserUtil {

	async ComparePassword(password, hash) {
		return await bcrypt.compare(password, hash);
	}
}

export default new UserUtil;

// criar o sistema de verificar a conta pelo email