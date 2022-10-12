// Dependencies
import mongoose from "mongoose";

// Model
const EmailValidation = mongoose.model( "EmailValidation", {

	email: { type: String, required: true },
	uuid: { type: String, required: true },
	expires_at: { type: Date, required: true },
	status: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
    
});

export default EmailValidation;