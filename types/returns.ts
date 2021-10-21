import { Relationship } from "./common"

export interface ReturnReceivedAchTransactionRequest {
    transactionId: string
    data: {
        type: "returnAch"
        attributes: {
            reason: "Unauthorized"
        }
        relationships: {
            account: Relationship
        }
    }
}