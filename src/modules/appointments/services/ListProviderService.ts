import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface Request {
    user_id: string;
}




@injectable()
export default class ListProviderService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) { }

    public async execute({ user_id }: Request): Promise<User[]> {


        let users = await this.cacheProvider.recover<User[]>(`providers-list:${user_id}`)

        if (!users) {
             users = await this.usersRepository.findAllProviders({
                expect_user_id: user_id
            })
        }

        await this.cacheProvider.save(`providers-list:${user_id}`, users )


        return users

    }
}