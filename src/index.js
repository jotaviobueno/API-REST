// Dependencies
import express from "express";
import cors from "cors";

// Port
const port = 3001;

// DataBase
import {Connect} from "./database/MongooseConnect.js";
import firebase from "./database/FireBaseConnect.js";

// Routes
import {UserRoutes} from "./app/Routes/UserRoutes.js";

// Config
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", UserRoutes);

if ( await Connect() ) {
	app.listen( port, () => {
		console.log( `listen on! http://localhost:${port}`);
	});
}

export default app;