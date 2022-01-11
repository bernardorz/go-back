import { getMongoRepository, MongoRepository, Raw } from 'typeorm';
import Notification from '../schemas/Notification';

//DTO = Data Transfer Object

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
class NotificationRepository implements INotificationsRepository {
    private ormRepository: MongoRepository<Notification>
    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({ content, recipient_id  }: ICreateNotificationDTO): Promise<Notification> {
        const appointment = this.ormRepository.create({ content, recipient_id })


        await this.ormRepository.save(appointment)

        return appointment;
    }

    
}

export default NotificationRepository