import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { injectable, inject } from 'tsyringe';
import Appointment from  '../infra/typeorm/entities/Appointment'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
// import { cache } from 'joi';

interface Request{
    provider_id : string;
    month : number;
    year : number;
    day : number;
}

@injectable()
export default class ListProviderAppointmentsService{

    constructor(
        @inject('AppointmentsRepository')
        private  appointmentsRepository : IAppointmentsRepository,
        
        @inject("CacheProvider")
        private cacheProvider : ICacheProvider
        ){}

    public async execute( { provider_id, month, year, day } : Request) : Promise<Appointment[]>{

        const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

        let appointments = await this.cacheProvider.recover<Appointment[]>(
          cacheKey,
        );

        if(!appointments){
            appointments =   await this.appointmentsRepository.findAllInDayFromProvider({
                provider_id,
                day,
                month,
                year
              })

              console.log('A new query was made on the DB')
        }

        await this.cacheProvider.save(cacheKey, classToClass(appointments));

        return appointments

    }
}