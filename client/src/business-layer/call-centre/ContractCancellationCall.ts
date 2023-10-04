import HandleCallStrategy from "./HandleCallStrategy";
import Call from "../../data-layer/data-classes/Call";

class ContractCancelationCall implements HandleCallStrategy {

    HandleCall(call:Call): void {
        // Implements loging a Contract Cancelation Call
    }
}

export default ContractCancelationCall;