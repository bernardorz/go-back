import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { injectable, inject } from 'tsyringe';

interface Request{
    user_id : string;
    avatarFilename : string;
}

@injectable()
export default class updateUserAvatarService{

    constructor(
        @inject('UsersRepository')
        private usersRepository : IUsersRepository,

        @inject('StorageProvider')
        private storageProvider : IStorageProvider
        ){}

    public async execute({ user_id, avatarFilename}: Request) : Promise<User>{

        const user = await this.usersRepository.findById(user_id)

        if(!user){
            throw new AppError('Only authenticated users can change avatar', 401)
        }

        if(user.avatar){
            this.storageProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = filename

        await this.usersRepository.save(user)


        user.password = "********"

        return user

    }
}