import User from '@modules/users/infra/typeorm/entities/User';
import { compare} from 'bcryptjs'
import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken'
import authConfig from '@config/Auth'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface Request {
    email : string;
    password : string;
}

interface Response {
    user : User;
    token : string;
}

@injectable()
class AuthenticateUserService{
    constructor(
        @inject('UsersRepository')
        private usersRepository : IUsersRepository,

        @inject('HashProvider')
        private HashProvider : IHashProvider
        ){}


    public async execute({ email, password}: Request): Promise<Response>{

        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError('Incorrect email/password combination', 401)
        }


        const passwordMatched = await this.HashProvider.compareHash(password, user.password)

        if(!passwordMatched){
            throw new AppError('Incorrect email/password combination', 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject : user.id,
            expiresIn : expiresIn,
        })

        // verify

        return{
            user,
            token
        }

    }

}


export default AuthenticateUserService