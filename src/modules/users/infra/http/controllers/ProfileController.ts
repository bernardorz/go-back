import {Response, Request} from 'express'
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer'
import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import ShowProfileService from '@modules/users/services/ShowProfileService';
import User from '../../typeorm/entities/User';

export default class ProfileController{


    async show(request : Request, response : Response) : Promise<Response>{

        const user_id = request.user.id

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({ user_id });

         // @ts-expect-error
         delete user.password;

        return response.json(classToClass(user))

    }


    async update(request : Request, response : Response) : Promise<Response>{

        const user_id = request.user.id

        const { name, email, old_password ,password} = request.body

        const updateProfileService = container.resolve(UpdateProfileService);

        const user = await updateProfileService.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        })

        // @ts-expect-error
        delete user.password;

        return response.status(201).json(classToClass(user))
    }

    
}