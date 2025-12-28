export type ActivityType = 'Call' | 'Email' | 'Meeting' | 'Task';

export interface Activity {
  id: string;
  subject: string;
  description?: string;
  type: ActivityType;
  priority?: 'High' | 'Normal' | 'Low';
  dueDateUtc?: string;
  completedDateUtc?: string;
  status: 'Upcoming' | 'Completed' | 'Overdue';
  relatedEntityType?: 'Account' | 'Contact' | 'Opportunity';
  relatedEntityId?: string;
  relatedEntityName?: string;
  ownerId?: string;
  ownerName?: string;
}

export interface UpsertActivityRequest {
  subject: string;
  description?: string;
  type: ActivityType;
  priority?: 'High' | 'Normal' | 'Low';
  dueDateUtc?: string;
  completedDateUtc?: string;
  relatedEntityType?: 'Account' | 'Contact' | 'Opportunity';
  relatedEntityId?: string;
  ownerId?: string;
}
