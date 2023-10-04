import ServiceClient from "./ServiceClient";
import { v4 as uuidv4 } from "uuid";

class Contract {
  constructor(
    ContractID,
    LinkedClient,
    ContractStatus,
    StartDate,
    ExpiryDate,
    ContractType
  ) {
    this.ContractID = ContractID || uuidv4();
    this.LinkedClient = LinkedClient || ServiceClient;
    this.ContractStatus = ContractStatus || "";
    this.StartDate = StartDate || new Date();
    this.ExpiryDate = ExpiryDate || new Date();
    this.ContractType = ContractType || "";
  }
}

export default Contract;
