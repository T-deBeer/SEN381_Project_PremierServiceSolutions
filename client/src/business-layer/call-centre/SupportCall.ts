import HandleCallStrategy from "./HandleCallStrategy";
import Call from "../../data-layer/data-classes/Call";
import DataHandler from "../../data-layer/database-call/DataHandler";

class SupportCall implements HandleCallStrategy {

    async HandleCall(call:Call): Promise<void> {
        // Implements loging a Support Call
        const handler = new DataHandler();
        await handler.MarkCallHandled(call.CallID);
    }
}

export default SupportCall;