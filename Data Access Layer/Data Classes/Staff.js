import { v4 as uuidv4 } from "uuid";

class Staff {
  constructor(StaffID, StaffName, StaffSurname, Password, StaffType) {
    this.StaffID = StaffID || uuidv4();
    this.StaffName = StaffName || "";
    this.StaffSurname = StaffSurname || "";
    this.Password = Password || ""; // This should be an encrypted string
    this.StaffType = StaffType || "";
  }
}

export default Staff;
