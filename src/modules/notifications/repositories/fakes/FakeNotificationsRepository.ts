import { ObjectId } from 'mongodb'

import Notification from '../../infra/typeorm/schemas/Notification';

//DTO = Data Transfer Object

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
class NotificationRepository implements INotificationsRepository {


    private notifications : Notification[] = [];

    
    public async create({ content, recipient_id  }: ICreateNotificationDTO): Promise<Notification> {
        
        const notification = new Notification();

        Object.assign(notification, { id : new ObjectId(), content, recipient_id })

        this.notifications.push(notification)


        return notification
    }

    
}

export default NotificationRepository