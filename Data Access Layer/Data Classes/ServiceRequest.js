import ServiceClient from "./ServiceClient";
import { v4 as uuidv4 } from "uuid";

class ServiceRequest {
  constructor(RequestID, RequestClient) {
    this.RequestID = RequestID || uuidv4();
    this.RequestClient = RequestClient || ServiceClient;
  }
}

export default ServiceRequest;
