import { v4 as uuidv4 } from 'uuid';
import Staff from './Staff'
import ServiceClient from './ServiceClient'

class Call {
    CallID: string;//String will be a GUID
    CallClient: ServiceClient;
    CallAttachments: string;
    LoggedTime: Date;
    HandledTime: Date | null;
    CallType: string;
  
    constructor(client: ServiceClient, attachments: string, type: string) {
      this.CallID = "";
      this.CallClient = client;
      this.CallAttachments = attachments;
      this.LoggedTime = new Date();
      this.HandledTime = null;
      this.CallType = type;
    }
  }

export default Call;