import { v4 as uuidv4 } from 'uuid';
import ServiceAgreement from '../../data-layer/data-classes/ServiceAgreement';
import ServiceAgreementStrategy from './ServiceAgreementStrategy';
import ServiceClient from '../../data-layer/data-classes/ServiceClient';

class ClientManagementSystem
{
    client: ServiceClient;
    serviceAgreementStrategy: ServiceAgreementStrategy
    //Clients: clients[];

    constructor(
        client: ServiceClient,
        strategy: ServiceAgreementStrategy
       // clients = []
    )
    {
        this.client = client;
        this.serviceAgreementStrategy = strategy;
        //this.Clients = [];
    }

    AddClient() {
    
    }
    
    RemoveClient() {
        
    }
    
    UpdateSLA() {
        
    }
    
    AddContactHistory(){
    
    }

    Handle(agreement:ServiceAgreement){ 
        this.serviceAgreementStrategy.HandleAgreement(agreement)
    }
}


export default ClientManagementSystem