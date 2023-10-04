import HandleCallStrategy from "./HandleCallStrategy";
import Call from "../../data-layer/data-classes/Call";

class SupportCall implements HandleCallStrategy {

    HandleCall(call:Call): void {
        // Implements loging a Support Call
    }
}

export default SupportCall;