// Dependencies
import yup from "yup";

class AuthAuthenticationRequest {

	async validateVerifyEmail( req, res, next ) {

		const queryValidator = yup.object().shape({
			id: yup.string().required(),
		});

		try {
			await queryValidator.validate(req.query);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}

	async validateGenerationNewToken( req, res, next ) {

		const bodyValidator = yup.object().shape({
			email: yup.string().required(),
		});

		try {
			await bodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}

}
export default new AuthAuthenticationRequest;
