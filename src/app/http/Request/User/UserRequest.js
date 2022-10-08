// Dependencies
import yup from "yup";

class ClientRequest {

	async ValidateSignUp ( req, res, next ) {

		const bodyValidator = yup.object().shape({
			username: yup.string().required(),
			email: yup.string().email().required(),
			password: yup.string().required(),
		});

		try {
			await bodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}

}
export default new ClientRequest;
