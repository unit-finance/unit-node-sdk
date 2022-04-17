import { Relationship, Tags, UnimplementedFields, UnimplementedRelationships } from "./common"

export type UnitEvent =
    AccountClosed | AccountFrozen | AccountReopened | AccountUnfrozen | ApplicationDenied | ApplicationAwaitingDocuments | ApplicationPendingReview |
    AuthorizationCreated | CardActivated | CardStatusChanged | CustomerCreated | DocumentApproved | DocumentRejected | PaymentClearing | PaymentReturned |
    PaymentSent | StatementsCreated | TransactionCreated | ReceivedPaymentCreated | ReceivedPaymentAdvanced | ReceivedPaymentCompleted | ReceivedPaymentReturned |
    ChargeBackCreated | RewardCreated | RewardSent | RewardRejected

export interface BaseEvent {
    id: string
    type: string
    attributes: BaseEventAttributes
    relationships?: UnimplementedRelationships
}

export interface BaseEventAttributes extends UnimplementedFields {
    createdAt: string
    tags?: Tags
}


export type AccountClosed = BaseEvent & {
    type: "account.closed"
    attributes: {
        closeReason: string
    }
    relationships: {
        account: Relationship
        customer: Relationship
    }
}

export type AccountFrozen = BaseEvent & {
    type: "account.frozen"
    attributes: {
        freezeReason: string
    }
    relationships: {
        account: Relationship
        customer: Relationship
    }
}

export type AccountReopened = BaseEvent & {
    type: "account.reopened"
    relationships: {
        account: Relationship
        customer: Relationship
    }
}

export type AccountUnfrozen = BaseEvent & {
    type: "account.unfrozen"
    relationships: {
        account: Relationship
        customer: Relationship
    }
}

export type ApplicationDenied = BaseEvent & {
    type: "application.denied"
    relationships: {
        application: Relationship
    }
}

export type ApplicationAwaitingDocuments = BaseEvent & {
    type: "application.awaitingDocuments"
    relationships: {
        application: Relationship
    }
}

export type ApplicationPendingReview = BaseEvent & {
    type: "application.pendingReview"
    relationships: {
        application: Relationship
    }
}

export type AuthorizationCreated = BaseEvent & {
    type: "authorization.created"
    attributes: {
        amount: number
        cardLast4Digits: string
        merchant: {
            name: string
            type: string
        }
        recurring: boolean
    }
    relationships: {
        authorization: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type CardActivated = BaseEvent & {
    type: "card.activated"
    relationships: {
        card: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type CardStatusChanged = BaseEvent & {
    type: "card.statusChanged"
    attributes: {
        newStatus: string
        previousStatus: string
    }
    relationships: {
        card: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type CustomerCreated = BaseEvent & {
    type: "customer.created"
    relationships: {
        customer: Relationship
        application: Relationship
    }
}

export type DocumentApproved = BaseEvent & {
    type: "document.approved"
    relationships: {
        document: Relationship
        application: Relationship
    }
}

export type DocumentRejected = BaseEvent & {
    type: "document.rejected"
    attributes: {
        reason: string
        reasonCode: string
    }
    relationships: {
        document: Relationship
        application: Relationship
    }
}

export type PaymentClearing = BaseEvent & {
    type: "payment.clearing"
    attributes: {
        previousStatus: string
    }
    relationships: {
        payment: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type PaymentSent = BaseEvent & {
    type: "payment.sent"
    attributes: {
        previousStatus: string
    }
    relationships: {
        payment: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type PaymentReturned = BaseEvent & {
    type: "payment.returned"
    attributes: {
        previousStatus: string
    }
    relationships: {
        payment: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type StatementsCreated = BaseEvent & {
    type: "statements.created"
    attributes: {
        period: string
    }
}

export type TransactionCreated = BaseEvent & {
    type: "transaction.created"
    attributes: {
        summary: string
        direction: "Credit" | "Debit"
        amount: number
    }
    relationships: {
        transaction: Relationship
        account: Relationship
        customer: Relationship
        payment: Relationship
    }
}

export type TransactionUpdated = BaseEvent & {
    type: "transaction.updated"
    attributes: {
        interchange: number
    }
    relationships: {
        transaction: Relationship
    }
}

export type ReceivedPaymentCreated = BaseEvent & {
    type: "receivedPayment.created"
    attributes: {
        status: string
        type: string
        amount: number
        completionDate: string
        companyName: string
        counterpartyRoutingNumber: string
        description: string
        traceNumber: string
        secCode: string
        addenda: string
    }
    relationships: {
        receivedPayment: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type ReceivedPaymentAdvanced = BaseEvent & {
    type: "receivedPayment.advanced"
    attributes: {
        previousStatus: string
        wasAdvanced: boolean
    }
    relationships: {
        receivedPayment: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type ReceivedPaymentCompleted = BaseEvent & {
    type: "receivedPayment.completed"
    attributes: {
        previousStatus: string
        wasAdvanced: boolean
    }
    relationships: {
        receivedPayment: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type ReceivedPaymentReturned = BaseEvent & {
    type: "receivedPayment.returned"
    attributes: {
        previousStatus: string
        wasAdvanced: boolean
    }
    relationships: {
        receivedPayment: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type ChargeBackCreated = BaseEvent & {
    type: "chargeback.created"
    attributes: {
        amount: number
        description: string
    }
    relationships: {
        chargeback: Relationship
        account: Relationship
        customer: Relationship
        counterpartyAccount: Relationship
        transaction: Relationship
    }
}

export type RewardCreated = BaseEvent & {
    type: "reward.created"
    relationships: {
        reward: Relationship
        fundingAccount: Relationship
        receivingAccount: Relationship
        customer: Relationship
    }
}

export type RewardSent = BaseEvent & {
    type: "reward.sent"
    relationships: {
        reward: Relationship
        fundingAccount: Relationship
        receivingAccount: Relationship
        customer: Relationship
    }
}

export type RewardRejected = BaseEvent & {
    type: "reward.rejected"
    relationships: {
        reward: Relationship
        fundingAccount: Relationship
        receivingAccount: Relationship
        customer: Relationship
    }
}

