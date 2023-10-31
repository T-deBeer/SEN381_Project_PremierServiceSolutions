import Call from "../../data-layer/data-classes/Call";
import HandleCallStrategy from "./HandleCallStrategy";


export class CallContext{
    CallStrategy: HandleCallStrategy;

    constructor(callStrategy: HandleCallStrategy){
        this.CallStrategy = callStrategy;      
    }

    Handle(call: Call): void{
        this.CallStrategy.HandleCall(call);
    }
}