import  {  getRepository , Repository } from 'typeorm';
import User from '../../infra/typeorm/entities/User';
import { v4 as uuidv4 } from 'uuid';;
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../../infra/typeorm/entities/UserToken'


class FakeUserTokensRepository  implements IUserTokensRepository{
 

      private usersToken : UserToken[] = [];


    public async generate(user_id : string) : Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            id : uuidv4(),
            token : uuidv4(),
            user_id
        })

        this.usersToken.push(userToken)

        return userToken
    }


    public async findByToken(token : string) : Promise<UserToken | undefined>{
        const userToken = this.usersToken.find(findToken => findToken.token === token)

        return userToken
    }

    
    
}

export default FakeUserTokensRepository