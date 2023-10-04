import ServiceClient from "../../data-layer/data-classes/ServiceClient";
import ServiceRequest from "../../data-layer/data-classes/ServiceRequest";
import Staff from "../../data-layer/data-classes/Staff";
import AssignRequest from "./AssignRequest";
import ScheduleStrategy from "./ScheduleStrategy";

class ServiceContext{
    scheduleStrategy: ScheduleStrategy;

    constructor(scheduleStrategy: ScheduleStrategy){
        this.scheduleStrategy = scheduleStrategy;
    }

    ScheduleRequest(client: ServiceClient, priority: number): void{
        this.scheduleStrategy.ScheduleRequest(client, priority);
    }

    AssignRequest(request: ServiceRequest, technician: Staff, jobStatus: string, difficultyRating: number): void{
        new AssignRequest().AssignRequest(request, technician, jobStatus, difficultyRating);
    }
}

export default ServiceContext;