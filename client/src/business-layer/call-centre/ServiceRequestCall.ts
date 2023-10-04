import HandleCallStrategy from "./HandleCallStrategy";
import Call from "../../data-layer/data-classes/Call";

class ServiceRequestCall implements HandleCallStrategy {

    HandleCall(call:Call): void {
        // Implements loging a Service Request Call
    }
}

export default ServiceRequestCall;