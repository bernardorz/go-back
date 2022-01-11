import {Response, Request} from 'express'
import { container } from 'tsyringe';
import SendForgotPasswordEmailService  from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController{
    async create(request : Request, response : Response) {

        const { email } = request.body

        const sendForgotPasswordService = container.resolve(SendForgotPasswordEmailService)


         await sendForgotPasswordService.execute({
            email
         })
          

        return response.status(204).json()

    }
}