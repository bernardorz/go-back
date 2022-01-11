import User from "../infra/typeorm/entities/User"
import ICreateUserDTO from "../dtos/ICreateUserDTO"
import IFindAllProviderDTO from "../dtos/IFindAllProviderDTO"


export default interface IUsersRepository{
    findAllProviders({ expect_user_id } : IFindAllProviderDTO) : Promise<User[]>
    findById(id : string) : Promise<User | undefined>;
    findByEmail(email : string) : Promise<User | undefined>;
    create(data : ICreateUserDTO) : Promise<User>;
    save(user : User) : Promise<User>;
}