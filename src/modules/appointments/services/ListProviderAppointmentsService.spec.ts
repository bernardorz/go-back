import 'reflect-metadata';


import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('ListProviderAppointmentsService',  () => {

    
    let fakeAppointmentsRepository : FakeAppointmentsRepository;
    let fakeUsersRepository : FakeUsersRepository;
    let fakeCacheRepository : FakeCacheProvider;
    let listProviderAppointmentsService : ListProviderAppointmentsService;

    beforeEach(() => {
        
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheRepository = new FakeCacheProvider();

        listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentsRepository, fakeCacheRepository);
        
        fakeUsersRepository = new FakeUsersRepository();
    })


    it('should be able to list the appointments on a specific day', async () => {

        const user = await fakeUsersRepository.create({
            name : "bernardo",
            email : "bernardorizzatti01@gmail.com",
            password : "ber123pvp"
        })

       const appointment1 = await fakeAppointmentsRepository.create({
            provider_id : user.id,
            user_id : '123123123',
            date : new Date(2020, 4, 20, 14, 0, 0)
        }) 

       const appointment2 = await fakeAppointmentsRepository.create({
            provider_id : user.id,
            user_id : '123123123',
            date : new Date(2020, 4, 20, 15, 0, 0)
        }) 

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 20, 11).getTime();
        })
      
        const avalability = await listProviderAppointmentsService.execute({
            provider_id : user.id,
            day : 20,
            year : 2020,
            month : 5
        })

        expect(avalability).toEqual([
            appointment1,
            appointment2
        ])
        
    });

})