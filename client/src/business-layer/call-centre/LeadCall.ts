import HandleCallStrategy from "./HandleCallStrategy";
import Call from "../../data-layer/data-classes/Call";

class LeadCall implements HandleCallStrategy {

    HandleCall(call:Call): void {
        // Implements loging a Lead Call
    }
}

export default LeadCall;