import ip from "ip";

class AuthLoginUtils {

	userAddress() {
		let userIp = ip.address();
		let UserIp = userIp.split(".");
		UserIp[3] = "***";
		return `${UserIp[0]}.${UserIp[1]}.${UserIp[2]}.${UserIp[3]}`;
	}
}

export default new AuthLoginUtils;