import HandleCallStrategy from "./HandleCallStrategy";
import Call from "../../data-layer/data-classes/Call";

class ClientDetailChangeCall implements HandleCallStrategy {

    HandleCall(call:Call): void {
        // Implements loging a Detail Change Call from a client
    }
}

export default ClientDetailChangeCall;