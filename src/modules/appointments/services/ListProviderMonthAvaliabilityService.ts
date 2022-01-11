import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import  { getDaysInMonth, getDate, isAfter } from 'date-fns'
import { injectable, inject } from 'tsyringe';

interface Request{
    provider_id : string;
    month : number;
    year : number;
}


/*

    retornar um array [ { day : 1, avaliable : false }]

*/

type IResponse = Array<{
    day : number;
    avalability : boolean;
}>;


@injectable()
export default class ListMonthAvaliabilityService{

    constructor(
        @inject('AppointmentsRepository')
        private  appointmentsRepository : IAppointmentsRepository
        ){}

    public async execute( { provider_id, month, year } : Request) : Promise<IResponse>{

        const appointments = await this.appointmentsRepository.findByAllInMonthFromProvider({
            provider_id,
            year,
            month
        })

        const numberOfDaysInMonth = getDaysInMonth(
            new Date(year, month - 1)
        )



        const eachDayArray = Array.from({ length : numberOfDaysInMonth},
            (_, index) => index + 1
        )

        const availability = eachDayArray.map(day => {

            const compareDate = new Date(year,month - 1,day, 23,59,59);

            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day
            })

            return {
                day,
                avalability : isAfter(compareDate, new Date()) && appointmentsInDay.length < 10
            }
        })

        return availability

    }
}