import { v4 as uuidv4 } from 'uuid';
import Staff from './Staff';
import ServiceRequest from './ServiceRequest';
import Contract from './Contract';
import ServiceClient from './ServiceClient';

class MaintenanceJob {
  JobID: string;
  Contract: Contract;
  Client: ServiceClient;
  Description: string;
  DifficultyRating: number;

  constructor(id:string, client:ServiceClient, contract: Contract, desc: string, rating: number) {
    this.JobID = id;
    this.Contract = contract;
    this.Client = client;
    this.Description = desc;
    this.DifficultyRating = rating;
  }
}

export default MaintenanceJob;