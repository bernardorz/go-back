import { Request, Response} from 'express';
import { container } from 'tsyringe';
import ListMonthAvaliabilityService from '@modules/appointments/services/ListProviderMonthAvaliabilityService'


export default class ProviderMonthAvailabilityController{


    public async index(request : Request, response : Response) : Promise<Response>{

        const  { provider_id } = request.params

        const { month, year } = request.query
    
        const listMonthAvaliabilityService = container.resolve(ListMonthAvaliabilityService);

        const availability =  await listMonthAvaliabilityService.execute({
            provider_id, month : Number(month),year: Number(year)
        })

        return response.json(availability)
    }

}