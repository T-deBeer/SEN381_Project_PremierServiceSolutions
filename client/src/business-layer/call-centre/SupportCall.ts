import HandleCallStrategy from "./HandleCallStrategy";
import Call from "../../data-layer/data-classes/Call";

class SupportCall implements HandleCallStrategy {

    HandleCall(call:Call): void {
        // Implements loging a Support Call
        console.log(call)
    }
}

export default SupportCall;