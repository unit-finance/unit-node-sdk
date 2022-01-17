import {ReasonCode, Relationship} from "."

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
    account: Relationship
  }
}

export interface TransmitAchPaymentSimulation {
  type: "transmitAchPayment"
  relationships: {
    payment: Relationship
  }
}

export interface ClearAchPaymentSimulation {
  type: "clearAchPayment"
  relationships: {
    payment: Relationship
  }
}

export interface ReturnAchPaymentSimulation {
  type: "returnAchPayment"
  relationships: {
    payment: Relationship
  }
}

export interface ReceiveWirePaymentSimulation {
  type: "wirePayment"
  attributes: {
    amount: number
    description: string
  }
  relationships: {
    account: Relationship
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
    recurring?: boolean
  }
  relationships: {
    account: Relationship
  }
}

export interface CreateCardPurchaseSimulation {
  type: "purchaseTransaction"
  attributes: {
    amount: number
    merchantName: string
    /**
     * The 4-digit ISO 18245 merchant category code (MCC). Use any number (e.g. 1000 for testing).
     */
    merchantType: number
    merchantLocation?: string
    last4Digits: string
    coordinates?: {
      longitude: number
      latitude: number
    }
    recurring?: boolean
  }
  relationships: {
    account: Relationship
    authorization?: Relationship
  }
}
