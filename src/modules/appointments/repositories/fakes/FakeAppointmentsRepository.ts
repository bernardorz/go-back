
import Appointment from '../../infra/typeorm/entities/Appointment';
import { v4 as uuidv4 } from 'uuid';
import { isEqual, getMonth, getDate, getYear } from 'date-fns';
import IAppointmentsRepository  from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllMonthFromProviderDTO';
import IListProviderDayAvailabilityDTO from '@modules/appointments/dtos/IListProviderDayAvailabilityDTO';

class AppointmentsRepository  implements IAppointmentsRepository{

    private appointmentes : Appointment[] = [];
  
     public async findByDate(date: Date) :  Promise<Appointment | undefined>{
    

        const findAppointment = this.appointmentes.find(appointment => isEqual(appointment.date, date));

        return findAppointment;
        
    }


    public async create({provider_id, user_id, date} : ICreateAppointmentDTO) : Promise<Appointment>{
     const appointment = new Appointment();
     
     Object.assign(appointment, { id : uuidv4(), date, provider_id, user_id});

     this.appointmentes.push(appointment);

     return appointment;

    }

    public async findByAllInMonthFromProvider( { provider_id, month, year } : IFindAllMonthFromProviderDTO) : Promise <Appointment[]>{
        const appointments = this.appointmentes.filter(appointment => {
            return appointment.provider_id === provider_id 
            && getMonth(appointment.date) + 1 === month
            && getYear(appointment.date) === year
        })


        return appointments;
    }

    public async findAllInDayFromProvider({ provider_id, day ,month, year } : IListProviderDayAvailabilityDTO) : Promise<Appointment[]>{

        const appointments = this.appointmentes.filter(appointment => {
            return appointment.provider_id === provider_id 
            && getDate(appointment.date) === day
            && getMonth(appointment.date) + 1 === month
            && getYear(appointment.date) === year
        })


        return appointments;

    }

}


export default AppointmentsRepository