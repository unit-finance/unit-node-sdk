import {Relationship, Tags, UnimplementedFields} from "./common"

export type UnitEvent =
    AccountClosed |
    ApplicationDenied |
    ApplicationAwaitingDocuments |
    AuthorizationCreated |
    CardActivated |
    CardStatusChanged |
    CustomerCreated |
    DocumentApproved |
    DocumentRejected |
    PaymentClearing |
    PaymentReturned |
    PaymentSent |
    StatementsCreated |
    TransactionCreated

export interface BaseEvent {
    id: string
    type: string
    attributes: BaseEventAttributes
    relationships?: BaseEventRelationships
}

export interface BaseEventAttributes extends UnimplementedFields {
    createdAt: string
    tags?: Tags
}

export interface BaseEventRelationships {
    [k: string]: Relationship
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
        amount: string
    }
    relationships: {
        transaction: Relationship
        account: Relationship
        customer: Relationship
        payment: Relationship
    }
}

