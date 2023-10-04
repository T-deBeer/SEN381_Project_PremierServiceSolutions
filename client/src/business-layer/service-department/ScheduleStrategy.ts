import ServiceClient from "../../data-layer/data-classes/ServiceClient";

interface ScheduleStrategy {  
    ScheduleRequest(client: ServiceClient, priority: number): void;
  }
  
export default ScheduleStrategy;