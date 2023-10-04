import { v4 as uuidv4 } from 'uuid';


class BusinessNote {
    ClientID: string;
    ClientName: string;
    BusinessNote: string;

    constructor(
      name: string,
      note: string
    ) {
      this.ClientID = uuidv4();
      this.ClientName = name;
      this.BusinessNote = note;
    }
}

export default BusinessNote;