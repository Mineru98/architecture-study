export interface BaseEvent { eventId: string; eventType: string; aggregateId: string; timestamp: Date; data: any; }
export class OrderCreatedEvent implements BaseEvent {
  eventId: string; eventType = 'ORDER_CREATED'; aggregateId: string; timestamp: Date; data: any;
  constructor(orderId: string, data: any) { this.eventId = crypto.randomUUID(); this.aggregateId = orderId; this.data = data; this.timestamp = new Date(); }
}
export class OrderStatusChangedEvent implements BaseEvent {
  eventId: string; eventType = 'ORDER_STATUS_CHANGED'; aggregateId: string; timestamp: Date; data: any;
  constructor(orderId: string, status: string) { this.eventId = crypto.randomUUID(); this.aggregateId = orderId; this.data = { status }; this.timestamp = new Date(); }
}
