import Appointment from "../infra/typeorm/entities/Appointment"
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO"
import IFindAllMonthFromProviderDTO from "../dtos/IFindAllMonthFromProviderDTO"
import IListProviderDayAvailabilityDTO from "../dtos/IListProviderDayAvailabilityDTO"


export default interface IAppointmentsRepository{
    create(data : ICreateAppointmentDTO) : Promise<Appointment>;
    findByDate(date : Date, provider_id : string) : Promise<Appointment | undefined>;
    findByAllInMonthFromProvider(data : IFindAllMonthFromProviderDTO) : Promise<Appointment[]>;
    findAllInDayFromProvider(data : IListProviderDayAvailabilityDTO) : Promise<Appointment[]>
}