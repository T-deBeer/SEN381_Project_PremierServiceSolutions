import ScheduleStrategy from "./ScheduleStrategy";
import ServiceRequest from "../../data-layer/data-classes/ServiceRequest";
import ServiceClient from "../../data-layer/data-classes/ServiceClient";

class DurationSchedule implements ScheduleStrategy {

    ScheduleRequest(client: ServiceClient, priority: number): void {
        // implements logic for scheduling a request based on priority
        const serviceRequest = new ServiceRequest(client, priority);
    }
}

export default DurationSchedule;