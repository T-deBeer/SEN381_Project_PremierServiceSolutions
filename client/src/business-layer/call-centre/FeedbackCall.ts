import HandleCallStrategy from "./HandleCallStrategy";
import Call from "../../data-layer/data-classes/Call";

class FeedbackCall implements HandleCallStrategy {

    HandleCall(call:Call): void {
        // Implements loging a Feedback Call
    }
}

export default FeedbackCall;