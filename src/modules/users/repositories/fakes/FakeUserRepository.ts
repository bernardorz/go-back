import  {  getRepository , Repository } from 'typeorm';
import User from '../../infra/typeorm/entities/User';
import { v4 as uuidv4 } from 'uuid';
//DTO = Data Transfer Object
;
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProviderDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';


class FakeUsersRepository  implements IUsersRepository{
 

    private users : User[] = [];


    public async findById(id : string) : Promise<User | undefined> {
        const user = this.users.find(user => user.id === id)

        return user
    }

    
    
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(user => user.email === email)

        return user
      }

    public async create(userData : ICreateUserDTO) : Promise<User>{
     const user = new User();

     Object.assign(user, { id : uuidv4(), ...userData})


     this.users.push(user)

     return user
    }

    
    public async save(user :  User) : Promise<User> {
      const findIndex = this.users.findIndex(findUser => findUser.id === user.id)


      this.users[findIndex] = user;

      return user
    }


    public async findAllProviders({expect_user_id } :  IFindAllProviderDTO) : Promise<User[]>{

        let users = this.users

        if(expect_user_id){
             users = this.users.filter(user => user.id !== expect_user_id)
        }

        return users
    }
}

export default FakeUsersRepository