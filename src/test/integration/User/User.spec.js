import request from "supertest";
// import app from "../../../index.js";
import app from "../../../app/http/Controller/User/UserController.js";

describe("User Test's", () => {
	it ("sign-up_test_success", () => {

		const data = {
			username: "otavio bueno",
			email: "joseotaviocbueno@gmail.com",
			password: "abc123@!"
		};

		try { 

			const test = request(app)
				.post("/sign-up")
				.send(data)
				.expect(201)
				.expect(test.body.message.username).toEqual(data.username);
			
		} catch(e) {
			console.log(e);
		}
			
	});
});