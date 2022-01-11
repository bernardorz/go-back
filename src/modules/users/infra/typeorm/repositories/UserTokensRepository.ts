import  {  getRepository , Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

//DTO = Data Transfer Object
;
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';


class UserToknsRepository  implements IUserTokensRepository{
    private ormRepository : Repository<UserToken>
    constructor(){
        this.ormRepository = getRepository(UserToken);
    }


    public async findByToken( token : string) : Promise<UserToken | undefined>{
        const userToken = await this.ormRepository.findOne({
            where : { token }
        })

        return userToken
    }


    public async generate(user_id : string) : Promise<UserToken>{
        const userToken = this.ormRepository.create({
            user_id
        })

        await this.ormRepository.save(userToken);

        return userToken;
    }
}

export default UserToknsRepository