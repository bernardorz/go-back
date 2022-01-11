import 'reflect-metadata';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('AuthenticateUser',  () => {



    let fakeHashProvider : FakeHashProvider;
    let fakeUsersRepository : FakeUsersRepository;
    let fakeCacheProvider : FakeCacheProvider
    let createUserService : CreateUserService;
    let authenticateUserService : AuthenticateUserService;

    beforeEach(() => {

        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();

        authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

        createUserService = new CreateUserService(fakeUsersRepository,fakeHashProvider, fakeCacheProvider);

    })


    it('should be able to authenticate', async () => {

       const user = await  createUserService.execute({
            name : "bernardo rizzatti",
            email : "bernardorizzatti@gmail.com",
            password : "ber123pvp"
        })



        const response = await authenticateUserService.execute({
            email : "bernardorizzatti@gmail.com",
            password : "ber123pvp"
        })


        expect(response.user).toEqual(user);
        expect(response).toHaveProperty('token');
        
    });

    it('should not be able to authenticate with not existing user ', async () => {

         fakeUsersRepository = new FakeUsersRepository();
         fakeHashProvider = new FakeHashProvider();

        const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);




        expect(authenticateUserService.execute({
            email : "bernardorizzatti@gmail.com",
            password : "ber123pvp"
        })).rejects.toBeInstanceOf
        (AppError);
        
    });

    it('should not be able to authenticate with wrong password', async () => {
        
       createUserService.execute({
            name : "bernardo rizzatti",
            email : "bernardorizzatti@gmail.com",
            password : "ber123pvp"
        })

        expect(authenticateUserService.execute({
            email : "bernardorizzatti@gmail.com",
            password : "ber321pvp"
        })).rejects.toBeInstanceOf
        (AppError);
        
    });
})