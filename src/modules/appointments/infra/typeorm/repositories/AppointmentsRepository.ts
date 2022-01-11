import { getRepository, Repository, Raw } from 'typeorm';
import Appointment from '../entities/Appointment';

//DTO = Data Transfer Object

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllMonthFromProviderDTO';
import { getYear, getMonth, startOfDay, startOfMonth } from 'date-fns';
import IListProviderDayAvailabilityDTO from '@modules/appointments/dtos/IListProviderDayAvailabilityDTO';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>
    constructor() {
        this.ormRepository = getRepository(Appointment);
    }
    public async findByDate(date: Date, provider_id : string): Promise<Appointment | undefined> {



        const findAppointment = await this.ormRepository.findOne({
            where: { date, provider_id },
        })

        return findAppointment
    }

    public async create({ provider_id, user_id ,date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, user_id, date })


        await this.ormRepository.save(appointment)

        return appointment;
    }

    public async findByAllInMonthFromProvider({ provider_id, month, year }: IFindAllMonthFromProviderDTO): Promise<Appointment[]> {

        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(DateFieldName =>
                    `to_char(${DateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
                )
            }
        });


        return appointments;
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
      }: IListProviderDayAvailabilityDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

    
        const appointments =  this.ormRepository.find({
            relations : ['user'],
            where: {
            provider_id,
            date: Raw(
              dateFieldName =>
                `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
            ),
          },
        });

        return appointments;
      }
}

export default AppointmentsRepository