import { NotificationData } from '@backend-template/types';

import { NotificationService } from '../notificationService';

export class NotificationServiceImpl implements NotificationService {
  async send(notificationData: NotificationData) {
    console.log('notification');
  }
}
