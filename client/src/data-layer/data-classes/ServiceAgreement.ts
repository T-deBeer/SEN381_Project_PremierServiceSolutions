import { v4 as uuidv4 } from 'uuid';
import Contract from './Contract';


class ServiceAgreement {
    AgreementID: string;
    LinkedContract: Contract;
    StartDate: Date;
    ExpiryDate: Date;
  
    constructor(agreementID:string,contract: Contract, startDate: Date, expiryDate: Date) {
      this.AgreementID = agreementID;
      this.LinkedContract = contract;
      this.StartDate = startDate;
      this.ExpiryDate = expiryDate;
    }
  }

export default ServiceAgreement;