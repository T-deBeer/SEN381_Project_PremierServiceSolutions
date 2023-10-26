import { v4 as uuidv4 } from 'uuid';
import ServiceClient from './ServiceClient';
import Staff from './Staff';

class ServiceRequest {
  RequestID: number = 0;
  RequestClient: ServiceClient;
  Staff: Staff | null = null;
  Priority: number;
  RequestTime: Date;
  FulfillmentDate: Date;
  Active;
  SKU: string;

  constructor(client: ServiceClient, priority: number, staff: Staff|null, serviceRequestTime: Date, serviceFulfillmentTime: Date, active: number, sku: string) {
    this.RequestClient = client;
    this.Staff = staff;
    this.Priority = priority;
    this.RequestTime = serviceRequestTime;
    this.FulfillmentDate = serviceFulfillmentTime;
    this.Active = active
    this.SKU = sku;
  }
}

export default ServiceRequest;