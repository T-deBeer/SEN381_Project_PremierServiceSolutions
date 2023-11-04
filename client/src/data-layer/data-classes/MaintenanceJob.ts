import { v4 as uuidv4 } from 'uuid';
import Staff from './Staff';
import ServiceRequest from './ServiceRequest';
import Contract from './Contract';
import ServiceClient from './ServiceClient';

class MaintenanceJob {
  JobID: string;
  Contract: Contract | null;
  Client: ServiceClient;
  Description: string;
  DifficultyRating: number;
  Type: string;

  constructor(id:string, client:ServiceClient, contract: Contract | null, desc: string, rating: number, type:string) {
    this.JobID = id;
    this.Contract = contract;
    this.Client = client;
    this.Description = desc;
    this.DifficultyRating = rating;
    this.Type = type;
  }
}

export default MaintenanceJob;