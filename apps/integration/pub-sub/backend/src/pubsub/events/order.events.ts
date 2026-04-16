export interface OrderCreatedEvent {
  type: 'OrderCreatedEvent';
  orderId: string;
  userId: string;
  total: number;
  items: any[];
  createdAt: Date;
}

export interface OrderStatusChangedEvent {
  type: 'OrderStatusChangedEvent';
  orderId: string;
  newStatus: string;
  changedAt: Date;
}
