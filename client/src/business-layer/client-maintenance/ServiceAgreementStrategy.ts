import ServiceAgreement from "../../data-layer/data-classes/ServiceAgreement";

interface ServiceAgreementStrategy {
    HandleAgreement(serviceAgreement: ServiceAgreement): void;
  }
export default ServiceAgreementStrategy;