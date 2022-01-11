import 'reflect-metadata';

import CreateAppointmentService from "./CreateAppointmentService";
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListMonthAvaliabilityService from './ListProviderMonthAvaliabilityService'
import AppError from '@shared/errors/AppError';

describe('ListProviderMonthAvailability',  () => {

    let listMonthAvaliabilityService : ListMonthAvaliabilityService;

    let fakeAppointmentsRepository : FakeAppointmentsRepository;

    let fakeUsersRepository : FakeUsersRepository;


    beforeEach(() => {
        
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        
        listMonthAvaliabilityService = new ListMonthAvaliabilityService(fakeAppointmentsRepository);
        
        fakeUsersRepository = new FakeUsersRepository();
    })


    it('should be able to list the month availability from provider', async () => {


        const user = await fakeUsersRepository.create({
            name : "bernardo",
            email : "bernardorizzatti01@gmail.com",
            password : "ber123pvp"
        })


        await fakeAppointmentsRepository.create({
            provider_id : user.id,
            user_id : '123123123',
            date : new Date(2020, 4, 20, 8, 0, 0)
        })

        
        await fakeAppointmentsRepository.create({
            provider_id : user.id,
            user_id : '123123123',
            date : new Date(2020, 4, 20, 9, 0, 0)
        })

        await fakeAppointmentsRepository.create({
            provider_id : user.id,
            user_id : '123123123',
            date : new Date(2020, 4, 20, 10, 0, 0)
        })

        await fakeAppointmentsRepository.create({
            provider_id : user.id,
            user_id : '123123123',
            date : new Date(2020, 4, 20, 11, 0, 0)
        })

        await fakeAppointmentsRepository.create({
            provider_id : user.id,
            user_id : '123123123',
            date : new Date(2020, 4, 20, 12, 0, 0)
        })

        await fakeAppointmentsRepository.create({
            provider_id : user.id,
            user_id : '123123123',
            date : new Date(2020, 4, 20, 13, 0, 0)
        })


        await fakeAppointmentsRepository.create({
            provider_id : user.id,
            user_id : '123123123',
            date : new Date(2020, 4, 20, 14, 0, 0)
        })

        await fakeAppointmentsRepository.create({
            provider_id : user.id,
            user_id : '123123123',
            date : new Date(2020, 4, 20, 15, 0, 0)
        })

        await fakeAppointmentsRepository.create({
            provider_id : user.id,
            user_id : '123123123',
            date : new Date(2020, 4, 20, 16, 0, 0)
        })

        await fakeAppointmentsRepository.create({
            provider_id : user.id,
            user_id : '123123123',
            date : new Date(2020, 4, 20, 17, 0, 0)
        })
        
        await fakeAppointmentsRepository.create({
            provider_id : user.id,
            user_id : '123123123',
            date : new Date(2020, 4, 21, 8, 0, 0)
        })

        const avalability = await listMonthAvaliabilityService.execute({
            provider_id : user.id,
            year : 2020,
            month : 5
        })


        expect(avalability).toEqual(
            expect.arrayContaining([
            { day : 8, avalability : true},
            { day : 20, avalability : false},
            { day : 10, avalability : true}
        ]))
        
    });

})