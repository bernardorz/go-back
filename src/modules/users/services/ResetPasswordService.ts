import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IUserTokensRepository from "../repositories/IUserTokensRepository";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";

interface Request{
    password : string;
    token : string;
}


@injectable()
class ResetPasswordService{
    
    constructor(
        @inject('UsersRepository')
        private usersRepository : IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository : IUserTokensRepository,

        @inject('HashProvider')
        private HashProvider : IHashProvider
        ){}

    public async execute({ token, password } : Request) : Promise<void>{

        const userToken = await this.userTokensRepository.findByToken(token);

        if(!userToken){
            throw new AppError('User token does not exist')
        }


        const user = await this.usersRepository.findById(userToken.user_id);

        if(!user){
            throw new AppError('User does not exist')
        }

        user.password = await this.HashProvider.generateHash(password);


        await this.usersRepository.save(user)

    }
}


export default ResetPasswordService