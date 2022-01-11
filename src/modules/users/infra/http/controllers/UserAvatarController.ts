import {Response, Request} from 'express'
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController{
    async update(request : Request ,response : Response){

        const updateUserAvatar = container.resolve(UpdateUserAvatarService);
        
        const user_id = request.user.id

        const user =  await updateUserAvatar.execute({
              user_id,
              avatarFilename : request.file.filename
          })
  
          return response.json(classToClass(user))
    }

    
}