import { v4 as uuidv4 } from 'uuid';


class IndividualNote {
    ClientID: string;
    ClientName: string;
    IndividualNote: string;

    constructor(
      name: string,
      note: string
    ) {
      this.ClientID = uuidv4();
      this.ClientName = name;
      this.IndividualNote = note;
    }
}

export default IndividualNote;