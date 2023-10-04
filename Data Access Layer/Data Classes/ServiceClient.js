import { v4 as uuidv4 } from "uuid";

class ServiceClient {
  constructor(ClientID, ClientName, ClientSurname, Password, ClientType) {
    this.ClientID = ClientID || uuidv4();
    this.ClientName = ClientName || "";
    this.ClientSurname = ClientSurname || "";
    this.Password = Password || ""; // This will be be an encrypted string
    this.ClientType = ClientType || "";
    this.ClientServiceAgreements = []; // Initialize as an empty array of ServiceAgreement objects
    this.ClientContracts = []; // Initialize as an empty array of Contract objects
  }
}

export default ServiceClient;
