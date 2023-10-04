import { v4 as uuidv4 } from 'uuid';
import ServiceAgreement from '../../data-layer/data-classes/ServiceAgreement';

class ClientManagementSystem
{
    ClientID: string;
    ClientName: string;
    ClientSurname: string;
    Password: string;
    ClientType: string;
    ClientServiceAgreements: ServiceAgreement[];
    //Clients: clients[];

    constructor(
        name: string,
        surname: string,
        password: string,
        clientType: string
       // clients = []
    )
    {
        this.ClientID = uuidv4();
        this.ClientName = name;
        this.ClientSurname = surname;
        this.Password = password;
        this.ClientType = clientType;
        this.ClientServiceAgreements = [];
        //this.Clients = [];
    }
}

function AddClient() {
    
}

function RemoveClient() {
    
}

function UpdateSLA() {
    
}

function AddContactHistory(){

}