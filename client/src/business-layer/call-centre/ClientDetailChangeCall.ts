import HandleCallStrategy from "./HandleCallStrategy";
import Call from "../../data-layer/data-classes/Call";
import DataHandler from "../../data-layer/database-call/DataHandler";

class ClientDetailChangeCall implements HandleCallStrategy {

    async HandleCall(call:Call): Promise<void> {
        const handler = new DataHandler();
       
        await handler.CreateMaintenanceJob(call,"client");
    }
}

export default ClientDetailChangeCall;