import ServiceClient from "./ServiceClient";
import Staff from "./Staff";
import { v4 as uuidv4 } from "uuid";

class Call {
  constructor(CallID, CallOperator, CallClient, CallAttachments, AnswerTime) {
    this.CallID = CallID || uuidv4();
    this.CallOperator = CallOperator || Staff; // Should be an Operator object
    this.CallClient = CallClient || ServiceClient; // Should be a Client object
    this.CallAttachments = CallAttachments || null; // Should be a Blob object
    this.AnswerTime = AnswerTime || new Date();
  }
}

export default Call;
