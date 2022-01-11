import { Router } from 'express';
import { celebrate, Segments, Joi} from 'celebrate';
import ResetPasswordController from '../controllers/ResetPasswordController';
import ForgotPasswordController from '../controllers/ForgotPasswordController'

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post('/forgot', celebrate({
    [Segments.BODY] : {
        email : Joi.string().required()
    }
}) ,forgotPasswordController.create)

passwordRouter.post('/reset',celebrate({
    [Segments.BODY] : {
        token : Joi.string().uuid().required(),
        password : Joi.string().required(),
        password_confirmation : Joi.string().required().valid(Joi.ref('password'))
    }
}) ,resetPasswordController.create)

export default passwordRouter;