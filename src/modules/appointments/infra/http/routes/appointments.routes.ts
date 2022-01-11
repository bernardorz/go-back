import { Router } from 'express';
import { celebrate, Segments, Joi} from 'celebrate'




import AppointsmentController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';



const appointmentsRouter = Router()
const appointsmentController = new AppointsmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated)
appointmentsRouter.post('/', celebrate({
    [Segments.BODY] : {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date()
    }
}) ,appointsmentController.create)

appointmentsRouter.get('/me', providerAppointmentsController.index)

export default appointmentsRouter;