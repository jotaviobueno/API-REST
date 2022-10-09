// Dependencies
import mongoose from "mongoose";

// Model
const LoginModel = mongoose.model( "login", {

	email: { type: String, required: true },
	address_ip: { type: String, required: true },
	session_id: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
	disconnected_in: { type: Date }
    
});

export default LoginModel;