import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository'
import { injectable, inject } from 'tsyringe';

interface Request{
    user_id : string;
}




@injectable()
export default class ShowProfileService{

    constructor(
        @inject('UsersRepository')
        private usersRepository : IUsersRepository
        ){}

    public async execute( { user_id } : Request) : Promise<User>{

        const user = await this.usersRepository.findById(user_id)

        if(!user){
            throw new AppError('User not found')
        }

        user.password = "********"

        return user

    }
}