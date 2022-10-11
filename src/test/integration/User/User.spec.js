import request from "supertest";
import app from "../../../index.js";

describe("User Test's", () => {
	it ("sign-up_test_success", () => {

		const data = {
			username: "otavio bueno",
			email: "123asb@gmail.com",
			password: "abc123@!"
		};

		try { 

			const test = request(app)
				.post("/sign-up")
				.send(data)
				.expect(201);
				
				
			
		} catch(e) {
			console.log(e);
		}
	});
});