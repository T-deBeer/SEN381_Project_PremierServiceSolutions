import Staff from "./Staff";
import { v4 as uuidv4 } from "uuid";

class MaintenanceJob {
  constructor(JobID, JobStatus, DifficultyRating, StaffMember) {
    this.JobID = JobID || uuidv4();
    this.StaffMember = StaffMember || Staff;
    this.JobStatus = JobStatus || "";
    this.DifficultyRating = DifficultyRating || 0;
  }
}

export default MaintenanceJob;
