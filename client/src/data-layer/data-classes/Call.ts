import { v4 as uuidv4 } from 'uuid';
import Staff from './Staff'
import ServiceClient from './ServiceClient'

class Call {
    CallID: string;//String will be a GUID
    CallClient: ServiceClient;
    CallAttachments: string | null;
    LoggedTime: Date;
    HandledTime: Date | null;
    CallType: string;
    CallDescription: string | undefined;
  
    constructor(client: ServiceClient, attachments: string |null, type: string) {
      this.CallID = "";
      this.CallClient = client;
      this.CallAttachments = attachments;
      this.LoggedTime = new Date();
      this.HandledTime = null;
      this.CallType = type;
      this.CallDescription = "";
    }
  }

export default Call;