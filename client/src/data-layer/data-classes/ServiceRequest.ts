import { v4 as uuidv4 } from 'uuid';
import ServiceClient from './ServiceClient';


class ServiceRequest {
  RequestID: string;
  RequestClient: ServiceClient;
  Priority: number;

  constructor(client: ServiceClient, priority: number) {
    this.RequestID = uuidv4();
    this.RequestClient = client;
    this.Priority = priority;
  }
}

export default ServiceRequest;