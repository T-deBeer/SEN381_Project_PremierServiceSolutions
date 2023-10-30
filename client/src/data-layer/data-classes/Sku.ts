class Sku {
    Sku: string;//String will be a GUID
    Description: string;
    HourlyRate: number;

  
    constructor(sku: string, description: string, hourlyRate:number) {
      this.Sku = sku;
      this.Description = description;
      this.HourlyRate = hourlyRate;
    }
  }

export default Sku;