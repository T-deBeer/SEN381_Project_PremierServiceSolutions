import { v4 as uuidv4 } from 'uuid';
import Staff from './Staff'
import ServiceClient from './ServiceClient'

class Call {
    CallID: string;//String will be a GUID
    CallClient: ServiceClient;
    CallAttachments: Blob;
    AnswerTime: Date;
  
    constructor(client: ServiceClient, attachments: Blob) {
      this.CallID = "";
      this.CallClient = client;
      this.CallAttachments = attachments;
      this.AnswerTime = new Date();
    }
  }

export default Call;