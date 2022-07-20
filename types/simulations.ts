import { ReasonCode } from "."

export interface ApproveApplicationSimulation {
    type: "applicationApprove"
    attributes: {
        reason: string
    }
}

export interface DenyApplicationSimulation {
    type: "applicationDeny"
    attributes: {
        reason: string
    }
}

export interface RejectDocumentSimulation {
    type: "documentReject"
    attributes: {
        reason: string
        reasonCode: ReasonCode
    }
}

export interface ReceiveAchPaymentSimulation {
    type: "achPayment"
    attributes: {
        amount: number
        direction: "Credit" | "Debit"
        description: string
    }
    relationships: {
        account: {
            type: "depositAccount"
            id: string
        }
    }
}

export interface TransmitAchPaymentSimulation {
    type: "transmitAchPayment"
    relationships: {
        payment: {
            type: "achPayment"
            id: string
        }
    }
}

export interface ClearAchPaymentSimulation {
    type: "clearAchPayment"
    relationships: {
        payment: {
            type: "achPayment"
            id: string
        }
    }
}

export interface ReturnAchPaymentSimulation {
    type: "returnAchPayment"
    relationships: {
        payment: {
            type: "achPayment"
            id: string
        }
    }
}

export interface ReceiveWirePaymentSimulation {
    type: "wirePayment"
    attributes: {
        amount: number
        description: string
    }
    relationships: {
        account: {
            data: {
                type: "depositAccount"
                id: string
            }
        }
    }
}

export interface CreateCardAuthorizationSimulation {
    type: "authorization"
    attributes: {
        amount: number
        cardLast4Digits: string
        merchantName: string
        /**
         * The 4-digit ISO 18245 merchant category code (MCC). Use any number (e.g. 1000 for testing).
         */
        merchantType: number
        merchantLocation: string
        recurring?: boolean
    }
    relationships: {
        account: {
            data: {
                type: "depositAccount"
                id: string
            }
        }
    }
}

export interface CreateCardPurchaseSimulation {
    type: "purchaseTransaction"
    attributes: {
        amount: number
        direction: string
        merchantName: string
        /**
         * The 4-digit ISO 18245 merchant category code (MCC). Use any number (e.g. 1000 for testing).
         */
        merchantType: number
        merchantLocation: string
        coordinates?: {
            longitude: number
            latitude: number
        }
        last4Digits: string
        recurring: false
    }
    relationships: {
        account: {
            data: {
                type: "depositAccount"
                id: string
            }
        }
    }
}

export interface CreateAchReceivedPaymentSimulation {
    type: "achReceivedPayment"
    attributes: {
        amount: number
        description: string
        companyName: string
        completionDate: string
        secCode: string
    }
    relationships: {
        account: {
            data: {
                type: "depositAccount"
                id: string
            }
        }
    }
}
