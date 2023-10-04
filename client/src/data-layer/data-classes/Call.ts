import { v4 as uuidv4 } from 'uuid';
import Staff from './Staff'
import ServiceClient from './ServiceClient'

class Call {
    CallID: string;//String will be a GUID
    CallOperator: Staff;
    CallClient: ServiceClient;
    CallAttachments: Blob;
    AnswerTime: Date;
  
    constructor(operator: Staff, client: ServiceClient, attachments: Blob) {
      this.CallID = uuidv4();
      this.CallOperator = operator;
      this.CallClient = client;
      this.CallAttachments = attachments;
      this.AnswerTime = new Date();
    }
  }

export default Call;