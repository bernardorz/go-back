import 'reflect-metadata';


import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

describe('ListProviderMonthAvailability',  () => {

    let listProviderDayAvailabilityService : ListProviderDayAvailabilityService;

    let fakeAppointmentsRepository : FakeAppointmentsRepository;

    let fakeUsersRepository : FakeUsersRepository;


    beforeEach(() => {
        
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        
        listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
        
        fakeUsersRepository = new FakeUsersRepository();
    })


    it('should be able to list the day availability from provider', async () => {

        const user = await fakeUsersRepository.create({
            name : "bernardo",
            email : "bernardorizzatti01@gmail.com",
            password : "ber123pvp"
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

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 20, 11).getTime();
        })
      
        const avalability = await listProviderDayAvailabilityService.execute({
            provider_id : user.id,
            day : 20,
            year : 2020,
            month : 5
        })


        expect(avalability).toEqual(
            expect.arrayContaining([
            { avalability : false, hour : 14},
            { avalability : false, hour : 15},
            { avalability : true , hour : 16}
        ]))
        
    });

})