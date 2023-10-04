import { v4 as uuidv4 } from 'uuid';
import Staff from './Staff';
import ServiceRequest from './ServiceRequest';

class MaintenanceJob {
  JobID: string;
  Request: ServiceRequest;
  StaffMember: Staff;
  JobStatus: string;
  DifficultyRating: number;

  constructor(request: ServiceRequest, staff: Staff, status: string, rating: number) {
    this.JobID = uuidv4();
    this.Request = request;
    this.StaffMember = staff;
    this.JobStatus = status;
    this.DifficultyRating = rating;
  }
}

export default MaintenanceJob;