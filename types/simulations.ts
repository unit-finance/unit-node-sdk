import { ReasonCode, Relationship } from "."

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
            data: {
                type: "depositAccount"
                id: string
            }
        }
    }
}

export interface TransmitAchPaymentSimulation {
    type: "transmitAchPayment"
    relationships: {
        payment: {
            data: {
                type: "achPayment"
                id: string
            }
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
        merchantLocation?: string
        merchantId?: string
        recurring?: boolean
        status?: "Authorized" | "Declined"
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

export interface IncreaseCardAuthorizationSimulation {
    type: "authorization"
    attributes: {
        amount: number
        cardLast4Digits: string
        recurring: boolean
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

export interface CancelCardAuthorizationSimulation {
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
        direction: "Credit" | "Debit"
        merchantName: string
        /**
         * The 4-digit ISO 18245 merchant category code (MCC). Use any number (e.g. 1000 for testing).
         */
        merchantType: number
        merchantLocation?: string
        merchantId?: string
        last4Digits: string
        coordinates?: {
            longitude: number
            latitude: number
        }
        recurring?: false
        internationalServiceFee?: number
    }
    relationships: {
        account: {
            data: {
                type: "depositAccount" | "creditAccount"
                id: string
            }
        }
        authorization?: {
            data: {
                type: "authorization"
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


export interface CreateCheckPaymentSimulation {
    type: "checkPayment"
    attributes: {
        amount: number
        checkNumber: string
    }
    relationships: {
        account: Relationship
    }
}

export interface CreateCardTransactionAuthorizationRequestSimulation {
    type: "cardTransactionAuthorizationRequest"
    attributes: {
        amount: number
        merchantName: string
        merchantType: string
        merchantLocation?: string
        recurring?: boolean
    }
    relationships: {
        card: Relationship
    }
}

export interface CreateCardPurchaseAuthorizationRequestSimulation{
    type: "purchaseAuthorizationRequest"
    attributes: {
        amount: number
        merchantName: string
        merchantType: string
        merchantLocation?: string
        merchantId?: string
        recurring?: boolean
        ecommerce?: boolean
        cardPresent?: boolean
    }
    relationships: {
        card: Relationship
    }
}

export interface CreateAtmAuthorizationRequestSimulation {
    type: "atmAuthorizationRequest"
    attributes: {
        amount: number
        atmName: string
        atmLocation?: string
    }
    relationships: {
        card: Relationship
    }
}

export interface AtmWithdrawalRequestSimulation {
    type: "atmTransaction"
    attributes: {
        amount: number
        atmName: string
        atmLocation: string
        last4Digits: string
    }
    relationships: {
        account: Relationship
    }
}