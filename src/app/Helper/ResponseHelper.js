import {response} from "express";

class ResponseHelper {

	success ( content ) {
		return response.status(200).json( content );
	}
  
	created ( content ) {
		return response.status(201).json( content );
	}
  
	noContent ( ) {
		return response.status(204);
	}
  
	badRequest ( content ) {
		return response.status(400).json( content );
	}
  
	notAuthorized (content ) {
		return response.status(401).json( content );
	}

	forbidden ( content ) {
		return response.status(401).json( content );
	}
  
	notFound ( content ) {
		return response.status(404).json( content );
	}

	notAcceptable ( content ) {
		return response.status(406).json( content );
	}
    
	unprocessableEntity ( content ) {
		return response.status(422).json( content );
	}
}
export default new ResponseHelper();