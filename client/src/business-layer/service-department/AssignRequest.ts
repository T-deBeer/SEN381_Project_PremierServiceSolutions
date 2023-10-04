import MaintenanceJob from "../../data-layer/data-classes/MaitainanceJob";
import ServiceRequest from "../../data-layer/data-classes/ServiceRequest";
import Staff from "../../data-layer/data-classes/Staff";

class AssignRequest {

    AssignRequest(request: ServiceRequest, technician: Staff, jobStatus: string, difficultyRating: number): void {
        // implements logic for assigning a request to a staff member (technician)
        const maintenanceJob = new MaintenanceJob(request, technician, jobStatus, difficultyRating);
    }
}

export default AssignRequest;