import { Router } from 'express';
import { celebrate, Segments, Joi} from 'celebrate';
import multer from 'multer'
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
const upload = multer(uploadConfig.multer);

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();


usersRouter.use(ensureAuthenticated)

usersRouter.post('/', celebrate({
    [Segments.BODY] : {
        name : Joi.string().required(),
        email : Joi.string().email().required(),
        password : Joi.string().required()
    }
}) ,usersController.create)

usersRouter.post('/' ,usersController.create)


usersRouter.patch('/avatar',upload.single('avatar'), usersAvatarController.update)

export default usersRouter;