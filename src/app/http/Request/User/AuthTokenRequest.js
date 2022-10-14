// Dependencies
import yup from "yup";

class AuthLoginRequest {

	async validateGenerationTokenToChangeEmail ( req, res, next ) {

		const headersValidator = yup.object().shape({
			session_id: yup.string().required(),
		});

		try {
			await headersValidator.validate(req.headers);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}

}
export default new AuthLoginRequest;
