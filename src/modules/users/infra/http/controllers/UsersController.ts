import {Response, Request} from 'express'
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService'
import { classToClass } from 'class-transformer'

export default class UsersController{
    async create(request : Request ,response : Response){

        const { name, email, password} = request.body

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            password
        })

        return response.status(201).json(classToClass(user))

    }

    
}