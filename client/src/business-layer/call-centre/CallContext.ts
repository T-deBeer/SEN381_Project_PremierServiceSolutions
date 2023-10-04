import Call from "../../data-layer/data-classes/Call";
import HandleCallStrategy from "./HandleCallStrategy";

class CallContext{
    CallStrategy: HandleCallStrategy;

    constructor(callStrategy: HandleCallStrategy){
        this.CallStrategy = callStrategy;
    }

    Handle(call: Call): void{
        this.CallStrategy.HandleCall(call);
    }
}