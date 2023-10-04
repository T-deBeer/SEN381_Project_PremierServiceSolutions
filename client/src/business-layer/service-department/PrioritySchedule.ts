import ScheduleStrategy from "./ScheduleStrategy";
import ServiceClient from "../../data-layer/data-classes/ServiceClient";
import ServiceRequest from "../../data-layer/data-classes/ServiceRequest";

class PrioritySchedule implements ScheduleStrategy {

    ScheduleRequest(client: ServiceClient, priority: number): void {
        // implements logic for scheduling a request based on priority
        const serviceRequest = new ServiceRequest(client, priority);
    }
}

export default PrioritySchedule;