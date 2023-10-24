import { v4 as uuidv4 } from 'uuid';
import Contract from './Contract'
import ServiceAgreement from './ServiceAgreement';

class ServiceClient {
    ClientID: string;
    ClientName: string;
    ClientSurname: string;
    ClientEmail: string;
    Password: string;
    ClientType: string;
    ClientServiceAgreements: ServiceAgreement[];
    ClientContracts: Contract[];
  
    constructor(
      name: string,
      surname: string,
      email: string,
      password: string,
      clientType: string
    ) {
      this.ClientID = uuidv4();
      this.ClientName = name;
      this.ClientSurname = surname;
      this.ClientEmail = email;
      this.Password = password;
      this.ClientType = clientType;
      this.ClientServiceAgreements = [];
      this.ClientContracts = [];
    }
  }

export default ServiceClient;