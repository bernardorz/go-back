import 'reflect-metadata';

import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider"
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository : FakeUsersRepository;
let fakeUserTokensRepository : FakeUserTokensRepository;
let fakeHashProvider : FakeHashProvider;

let resetPasswordService : ResetPasswordService;

describe('SendForgotPasswordEmail',  () => {

    beforeEach(() => {

         fakeUsersRepository = new FakeUsersRepository();

         fakeUserTokensRepository = new FakeUserTokensRepository();

         fakeHashProvider = new FakeHashProvider();

         resetPasswordService = new ResetPasswordService(fakeUsersRepository,fakeUserTokensRepository, fakeHashProvider);

    })


    it('should be able to reset the password ', async () => {


       const user = await fakeUsersRepository.create({
            name : "bernardo rizzatti",
            email : "bernardorizzatti01@gmail.com",
            password : "ber123pvp"
        })

        const { token } = await fakeUserTokensRepository.generate(user.id)


        await resetPasswordService.execute({
            password : '123123',
            token
        })

        const updatedUser  = await fakeUsersRepository.findById(user.id)

        expect(updatedUser?.password).toBe('123123');
   
    });

})


// Hash

// token 2horas de expiração