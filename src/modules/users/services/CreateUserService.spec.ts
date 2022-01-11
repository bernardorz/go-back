import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';



let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider : FakeCacheProvider
let createUserService: CreateUserService;

describe('CreateAppointment', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();

        createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
    })


    it('should be able to create a new user', async () => {
        const CreateNewUser = await createUserService.execute({
            name: "bernardo rizzatti",
            email: "bernardorizzatti@gmail.com",
            password: "ber123pvp"
        })


        expect(CreateNewUser).toHaveProperty('id');
        expect(CreateNewUser.email).toBe('bernardorizzatti@gmail.com');

    });

    it('should not be able to create a new user with same email from another', async () => {
        await createUserService.execute({
            name: "bernardo rizzatti",
            email: "bernardorizzatti@gmail.com",
            password: "ber123pvp"
        })

        await expect(
            createUserService.execute({
                name: "bernardo rizzatti",
                email: "bernardorizzatti@gmail.com",
                password: "ber123pvp"
            })
        ).rejects.toBeInstanceOf(AppError);



    });
})