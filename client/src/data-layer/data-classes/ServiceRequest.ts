import { v4 as uuidv4 } from 'uuid';
import ServiceClient from './ServiceClient';
import Staff from './Staff';

class ServiceRequest {
  RequestID: string;
  RequestClient: ServiceClient;
  Staff: Staff;
  Priority: number;
  RequestTime: Date;
  FulfillmentDate: Date;

  constructor(client: ServiceClient, priority: number, staff: Staff, serviceRequestTime: Date, serviceFulfillmentTime: Date) {
    this.RequestID = uuidv4();
    this.RequestClient = client;
    this.Staff = staff;
    this.Priority = priority;
    this.RequestTime = serviceRequestTime;
    this.FulfillmentDate = serviceFulfillmentTime;
  }
}

export default ServiceRequest;