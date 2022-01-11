import 'reflect-metadata';

import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';


let fakeUsersRepository : FakeUsersRepository;
let fakeUserTokensRepository : FakeUserTokensRepository;
let fakeMailProvider : FakeMailProvider;

let sendForgotPasswordEmail : SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail',  () => {

    beforeEach(() => {

         fakeUsersRepository = new FakeUsersRepository();
         fakeMailProvider = new FakeMailProvider();
         fakeUserTokensRepository = new FakeUserTokensRepository();


         sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider,fakeUserTokensRepository);
        

    })


    it('should be able to recover the password using the email ', async () => {

 
        const sendMail =  jest.spyOn(fakeMailProvider, "sendMail");;

        await fakeUsersRepository.create({
            name : "bernardo rizzatti",
            email : "bernardorizzatti01@gmail.com",
            password : "ber123pvp"
        })


        await sendForgotPasswordEmail.execute({ email : "bernardorizzatti01@gmail.com"})

        expect(sendMail).toHaveBeenCalled();
   
    });

    it('should not be able to recover a non-existing user password ', async () => {
        
        await expect(sendForgotPasswordEmail.execute({
        email : "bernardorzt@gmail.com"}
        )).rejects.toBeInstanceOf(AppError)
   
    });

    it('should generate a forgot password token ', async () => {

     
        const genereateToken = jest.spyOn(fakeUserTokensRepository, 'generate');


        const user = await fakeUsersRepository.create({
            name : 'bernardo',
            email  : 'bernardorizzatti01@gmail.com',
            password : 'ber123pvp'
        })


        await sendForgotPasswordEmail.execute({
            email : 'bernardorizzatti01@gmail.com'
        })

        expect(genereateToken).toHaveBeenCalledWith(user.id)

   
    });

})