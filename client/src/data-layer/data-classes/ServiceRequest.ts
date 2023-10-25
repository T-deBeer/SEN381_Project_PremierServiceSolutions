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

  constructor(client: ServiceClient, priority: number, staff: Staff|null, serviceRequestTime: Date, serviceFulfillmentTime: Date) {
    this.RequestClient = client;
    this.Staff = staff;
    this.Priority = priority;
    this.RequestTime = serviceRequestTime;
    this.FulfillmentDate = serviceFulfillmentTime;
  }
}

export default ServiceRequest;