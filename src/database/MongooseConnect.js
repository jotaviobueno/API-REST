// Dependencies
import mongoose from "mongoose";

import {envConfig} from "../config/storage.js";

export async function Connect () {
	return await mongoose.connect(envConfig.databaseURL).then( () => {
		console.log("connected with Mongoose");

		return true;
	}).catch( (e) => {
		console.log(e);
	});
}