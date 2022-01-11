import 'reflect-metadata';

import CreateAppointmentService from "./CreateAppointmentService";

import FakeNotificationRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository"
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('CreateAppointment',  () => {

    let fakeNotificationRepository : FakeNotificationRepository;
    let fakeAppointmentsRepository : FakeAppointmentsRepository;
    let fakeCacheProvider : FakeCacheProvider
    let fakeUsersRepository: FakeUsersRepository;
    let createAppointment : CreateAppointmentService;
    


    beforeEach(() => {
         fakeAppointmentsRepository = new FakeAppointmentsRepository();
         fakeCacheProvider = new FakeCacheProvider();
         fakeNotificationRepository = new FakeNotificationRepository();

         createAppointment = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationRepository, fakeCacheProvider);
         fakeUsersRepository = new FakeUsersRepository();
    })


    it('should be able to create a new appointment', async () => {

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        })





        const appointment = await  createAppointment.execute({
            date : new Date(2020, 4, 10, 13),
            user_id : '1231273123',
            provider_id : '12763123123'
        })


        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('12763123123');
        
    });

    it('should not be able to create a new appointment on the same time', async () => {
    
    const appointmentDate = new Date(2021, 9, 20, 9 );

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
          
        
    });

    it('should not be able to create a new appointments on a past date', async () => {
    
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        })

        
        expect(
            createAppointment.execute({
                date : new Date(2020, 4, 10, 11),
                user_id : '123123123',
                provider_id : '12323123123'
            })
        ).rejects.toBeInstanceOf(AppError);
          
        
    });

    it('should not be able to create a new appointment with same user as provider', async () => {
    
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        })

        
        expect(
            createAppointment.execute({
                date : new Date(2020, 4, 10, 11),
                user_id : 'user-id',
                provider_id : 'user-id'
            })
        ).rejects.toBeInstanceOf(AppError);
          
        
    });

    it('should not be able to create an appointment outside before 8am and after 5pm', async () => {
    
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });


        expect(
            createAppointment.execute({
                date : new Date(2020, 4, 10, 7),
                user_id : 'user-id',
                provider_id : 'user-id'
            })
        ).rejects.toBeInstanceOf(AppError);

        
        expect(
            createAppointment.execute({
                date : new Date(2020, 4, 10, 18),
                user_id : 'user-id',
                provider_id : 'user-id'
            })
        ).rejects.toBeInstanceOf(AppError);
          
        
    });
})