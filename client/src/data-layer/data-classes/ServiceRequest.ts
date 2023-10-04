import { v4 as uuidv4 } from 'uuid';
import ServiceClient from './ServiceClient';


class ServiceRequest {
  RequestID: string;
  RequestClient: ServiceClient;

  constructor(client: ServiceClient) {
    this.RequestID = uuidv4();
    this.RequestClient = client;
  }
}

export default ServiceRequest;