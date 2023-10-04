import Contract from "../../data-layer/data-classes/Contract";
import HandleContractStrategy from "./HandleContractStrategy";

class MaintenanceContext {
    ContractStrategy: HandleContractStrategy;

    constructor(strategy: HandleContractStrategy){
        this.ContractStrategy = strategy;
    }

    Handle(contract: Contract): void{
        this.ContractStrategy.HandleMaintenance(contract);
    }
}

export default MaintenanceContext;