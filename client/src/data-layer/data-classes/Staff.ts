import { v4 as uuidv4 } from 'uuid';

class Staff {
    StaffID: string;//String will be a GUID
    StaffName: string;
    StaffSurname: string;
    Password: string;//String will be encrypted
    StaffType: string;
  
    constructor(name: string, surname: string, password: string, type: string) {
      this.StaffID = uuidv4();
      this.StaffName = name;
      this.StaffSurname = surname;
      this.Password = password;
      this.StaffType = type;
    }
  }

export default Staff;