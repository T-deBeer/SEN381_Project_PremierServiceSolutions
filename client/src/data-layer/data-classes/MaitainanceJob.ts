import { v4 as uuidv4 } from 'uuid';
import Staff from './Staff';

class MaintenanceJob {
    JobID: string;
    StaffMember: Staff;
    JobStatus: string;
    DifficultyRating: number;
  
    constructor(staff: Staff, status: string, rating: number) {
      this.JobID = uuidv4();
      this.StaffMember = staff;
      this.JobStatus = status;
      this.DifficultyRating = rating;
    }
  }
  
export default MaintenanceJob;