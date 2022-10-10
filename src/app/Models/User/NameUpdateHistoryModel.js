// Dependencies
import mongoose from "mongoose";

// Model
const nameUpdateHistory = mongoose.model( "nameUpdateHistory", {

	email: { type: String, required: true },
	new_name: { type: String, required: true },
	old_name: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
    
});

export default nameUpdateHistory;