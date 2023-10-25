import { v4 as uuidv4 } from 'uuid';

class Staff {
    StaffID: string;//String will be a GUID
    StaffName: string;
    StaffSurname: string;
    Email: string;
    Password: string;//String will be encrypted
    StaffType: string;
  
    constructor(name: string, surname: string, email:string, password: string, type: string) {
      this.StaffID = "";
      this.StaffName = name;
      this.StaffSurname = surname;
      this.Email = email;
      this.Password = password;
      this.StaffType = type;
    }
  }

export default Staff;