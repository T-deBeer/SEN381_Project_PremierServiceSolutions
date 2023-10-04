import Contract from "./Contract";
import { v4 as uuidv4 } from "uuid";

class ServiceAgreement {
  constructor(AgreementID, LinkedContract, StartDate, ExpiryDate) {
    this.AgreementID = AgreementID || uuidv4();
    this.LinkedContract = LinkedContract || Contract;
    this.StartDate = StartDate || new Date();
    this.ExpiryDate = ExpiryDate || new Date();
  }
}

export default ServiceAgreement;
