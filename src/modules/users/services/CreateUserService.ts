import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository'
import { injectable, inject } from 'tsyringe';

import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request{
    name : string;
    email : string;
    password : string;
}


@injectable()
class CreateUserService{
    
    constructor(
        @inject('UsersRepository')
        private usersRepository : IUsersRepository,

        @inject('HashProvider')
        private HashProvider : IHashProvider,

        @inject('CacheProvider')
        private cacheProvider : ICacheProvider
        ){}

    public async execute({ name, email, password } : Request) : Promise<User>{

        
        const checkedUserExist = await this.usersRepository.findByEmail(email)


        if(checkedUserExist){
            throw new AppError('Email adress already used.')
        }

        const hashedPassword = await this.HashProvider.generateHash(password)

        const user = await this.usersRepository.create({
            name,
            email,
            password : hashedPassword
        })


        await this.cacheProvider.invalidatePrefix('providers-list')

        return user


    }
}


export default CreateUserService