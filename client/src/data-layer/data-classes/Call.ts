import { v4 as uuidv4 } from 'uuid';
import Staff from './Staff'
import ServiceClient from './ServiceClient'

class Call {
    CallID: string;//String will be a GUID
    CallClient: ServiceClient;
    CallAttachments: Blob;
    LoggedTime: Date;
    HandledTime: Date | null;
  
    constructor(client: ServiceClient, attachments: Blob) {
      this.CallID = "";
      this.CallClient = client;
      this.CallAttachments = attachments;
      this.LoggedTime = new Date();
      this.HandledTime = null;
    }
  }

export default Call;