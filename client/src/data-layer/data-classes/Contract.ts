import { v4 as uuidv4 } from 'uuid';
import ServiceClient from './ServiceClient';

class Contract {
    ContractID: string;
    LinkedClient: ServiceClient;
    ContractStatus: string;
    StartDate: Date;
    ExpiryDate: Date;
    ContractType: string;
  
    constructor(
      client: ServiceClient,
      status: string,
      startDate: Date,
      expiryDate: Date,
      contractType: string
    ) {
      this.ContractID = uuidv4();
      this.LinkedClient = client;
      this.ContractStatus = status;
      this.StartDate = startDate;
      this.ExpiryDate = expiryDate;
      this.ContractType = contractType;
    }
  }

export default Contract;