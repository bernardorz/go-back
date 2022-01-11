import 'reflect-metadata';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('UpdateProfile',  () => {



    let  fakeUsersRepository : FakeUsersRepository;
    let  fakeHashProvider : FakeHashProvider;
    let  fakeCacheProvider : FakeCacheProvider;
    let  createUserService : CreateUserService;
    let  updateProfile : UpdateProfileService;

    beforeEach(() => {

        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();
        createUserService = new CreateUserService(fakeUsersRepository,fakeHashProvider, fakeCacheProvider);
        updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider)

    })


    it('should be able update the profile', async () => {

       const user = await  createUserService.execute({
            name : "bernardo rizzatti",
            email : "bernardorizzatti@gmail.com",
            password : "ber123pvp"
        })



        const updatedUser = await updateProfile.execute({
            user_id : user.id,
            name : 'bernardinho',
            email : 'bernardinho@gmail.com',
        })

        expect(updatedUser.name).toBe('bernardinho');
        
    });

    it('should not be able update the profile of non existent user', async () => {
        await expect(
          updateProfile.execute({
            user_id: 'non-existent-user',
            name : 'test',
            email : 'test@gmail.com'
          }),
        ).rejects.toBeInstanceOf(AppError);
      });

    it('should not be able to change the email', async () => {

        const user = await  createUserService.execute({
            name : "test",
            email : "teste@gmail.com",
            password : "test"
        })


         await createUserService.execute({
             name : "bernardo rizzatti",
             email : "bernardorizzatti@gmail.com",
             password : "ber123pvp"
         })
 
 
 
         await expect( updateProfile.execute({
            user_id : user.id,
            name : 'bernardinho',
            email : 'bernardorizzatti@gmail.com',
            })).rejects.toBeInstanceOf(AppError)
 
     
     });


     
    it('should be able update the password', async () => {

        const user = await  createUserService.execute({
             name : "bernardo rizzatti",
             email : "bernardorizzatti@gmail.com",
             password : "ber123pvp"
         })
 
 
 
         const updatedUser = await updateProfile.execute({
             user_id : user.id,
             name : 'bernardinho',
             email : 'bernardinho@gmail.com',
             password : 'novoPassowrd',
             old_password : 'ber123pvp'
         })
 
         expect(updatedUser.password).toBe('novoPassowrd');
         
     });

     it('should not be able update the password without old password ', async () => {

        const user = await  createUserService.execute({
             name : "bernardo rizzatti",
             email : "bernardorizzatti@gmail.com",
             password : "ber123pvp"
         })
 
         await expect(updateProfile.execute({
            user_id : user.id,
            name : 'bernardinho',
            email : 'bernardinho@gmail.com',
            password : 'novoPassowrd'
        })).rejects.toBeInstanceOf(AppError)
         
     });

     it('should not be able update the password without wrong old password ', async () => {

        const user = await  createUserService.execute({
             name : "bernardo rizzatti",
             email : "bernardorizzatti@gmail.com",
             password : "ber123pvp"
         })
 
         await expect(updateProfile.execute({
            user_id : user.id,
            name : 'bernardinho',
            email : 'bernardinho@gmail.com',
            password : 'novoPassowrd',
            old_password : "pvp123ber"
        })).rejects.toBeInstanceOf(AppError)
         
     });


})