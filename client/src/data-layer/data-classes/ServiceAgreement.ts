import { v4 as uuidv4 } from 'uuid';
import Contract from './Contract';


class ServiceAgreement {
    AgreementID: string;
    LinkedContract: Contract;
    StartDate: Date;
    ExpiryDate: Date;
  
    constructor(contract: Contract, startDate: Date, expiryDate: Date) {
      this.AgreementID = uuidv4();
      this.LinkedContract = contract;
      this.StartDate = startDate;
      this.ExpiryDate = expiryDate;
    }
  }

export default ServiceAgreement;