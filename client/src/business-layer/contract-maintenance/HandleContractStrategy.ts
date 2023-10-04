import Contract from "../../data-layer/data-classes/Contract";

interface HandleContractStrategy{
    HandleMaintenance(contract:Contract): void;
}

export default HandleContractStrategy;