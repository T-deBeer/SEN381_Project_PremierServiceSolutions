import ServiceAgreement from "../../data-layer/data-classes/ServiceAgreement";
import ServiceAgreementStrategy from "./ServiceAgreementStrategy";

class TerminateAgreementC1 implements ServiceAgreementStrategy {

    HandleAgreement(serviceAgreement: ServiceAgreement): void {
        //Logic for teminating an Agreement
    }

}

export default TerminateAgreementC1;