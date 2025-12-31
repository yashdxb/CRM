export type ActivityType = 'Call' | 'Email' | 'Meeting' | 'Task' | 'Note';

export interface Activity {
  id: string;
  subject: string;
  description?: string;
  type: ActivityType;
  priority?: 'High' | 'Normal' | 'Low';
  dueDateUtc?: string;
  completedDateUtc?: string;
  createdAtUtc?: string;
  status: 'Upcoming' | 'Completed' | 'Overdue';
  relatedEntityType?: 'Account' | 'Contact' | 'Opportunity' | 'Lead';
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
  relatedEntityType?: 'Account' | 'Contact' | 'Opportunity' | 'Lead';
  relatedEntityId?: string;
  ownerId?: string;
}
