type NotificationDataValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[];

interface NotificationTemplateData {
  [x: string]: NotificationDataValue | NotificationTemplateData;
}

export type NotificationData = {
  templateId: string;
  templateData: NotificationTemplateData;
  emailRecipients?: string[];
  smsRecipients?: string[];
  pushNotificationRecipients?: string[];
};
