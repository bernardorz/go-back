import  {  getRepository , Repository, Not } from 'typeorm';
import User from '../entities/User';

//DTO = Data Transfer Object
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProviderDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';


class UsersRepository  implements IUsersRepository{
    private ormRepository : Repository<User>
    constructor(){
        this.ormRepository = getRepository(User);
    }


    public async findById(id : string) : Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id)

        return user
    }

    
    
    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = await this.ormRepository.findOne({
          where: { email },
        });
    
        return findUser;
      }

    public async create(userData : ICreateUserDTO) : Promise<User>{
        const appointment = this.ormRepository.create(userData)


        await this.ormRepository.save(appointment)

        return appointment;
    }

    
    public async save(user :  User) : Promise<User> {
        return this.ormRepository.save(user)
    }

    public async findAllProviders({expect_user_id} : IFindAllProviderDTO) : Promise<User[]>{

        let users : User[];

        if(expect_user_id){
             users = await this.ormRepository.find({
                where : {
                    id : Not(expect_user_id)
                }
            })
        } else {
            users = await this.ormRepository.find();
        }


        return users

    }
}

export default UsersRepository