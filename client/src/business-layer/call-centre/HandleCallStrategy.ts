import Call from "../../data-layer/data-classes/Call";

interface HandleCallStrategy {  
    HandleCall(call: Call): void;
  }
  
export default HandleCallStrategy;