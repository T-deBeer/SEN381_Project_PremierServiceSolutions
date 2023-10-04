import ServiceAgreement from "../../data-layer/data-classes/ServiceAgreement";
import ServiceAgreementStrategy from "./ServiceAgreementStrategy";

class UpdateAgreementC1 implements ServiceAgreementStrategy {

    HandleAgreement(serviceAgreement: ServiceAgreement): void {
        //Logic for updating an Agreement
    }

}

export default UpdateAgreementC1;