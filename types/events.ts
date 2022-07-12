import { Direction, HealthcareAmounts, Merchant, Relationship, Tags, UnimplementedFields, UnimplementedRelationships } from "./common"
import {ReceivedPaymentStatus} from "./payments"

export type UnitEvent = AccountEvents | ApplicationEvents | AuthorizationEvents | CardEvents | CustomerEvents | DocumentApproved | CheckDepositEvents |
 DocumentRejected | PaymentEvents | StatementsCreated | TransactionEvents | ChargeBackCreated | RewardEvents | DisputeEvents | BaseEvent

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

export interface BaseEventRelationships {
    account: Relationship
    customer: Relationship
}

type AccountEvents = AccountClosed | AccountFrozen | AccountReopened | AccountUnfrozen

export type AccountClosed = BaseEvent & {
    type: "account.closed"
    attributes: {
        closeReason: string
    }
    relationships: BaseEventRelationships
}

export type AccountFrozen = BaseEvent & {
    type: "account.frozen"
    attributes: {
        freezeReason: string
    }
    relationships: BaseEventRelationships
}

export type AccountReopened = BaseEvent & {
    type: "account.reopened"
    relationships: BaseEventRelationships
}

export type AccountUnfrozen = BaseEvent & {
    type: "account.unfrozen"
    relationships: BaseEventRelationships
}

type ApplicationEvents = ApplicationDenied | ApplicationAwaitingDocuments | ApplicationPendingReview

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

type AuthorizationRelationships = BaseEventRelationships & {
    authorization: Relationship
    card: Relationship
}

type AuthorizationAttributes = BaseEventAttributes & {
    amount: number
    cardLast4Digits: string
    recurring: boolean
}

type AuthorizationEvents = AuthorizationCreated | AuthorizationCanceled | AuthorizationDeclined | AuthorizationAmountChanged | AuthorizationRequestApproved
 | AuthorizationRequestPending | AuthorizationRequestDeclined

export type AuthorizationCreated = BaseEvent & {
    type: "authorization.created"
    attributes: {
        merchant: Merchant
    } & AuthorizationAttributes
    relationships: AuthorizationRelationships
}

export type AuthorizationCanceled = BaseEvent & {
    type: "authorization.canceled"
    attributes: AuthorizationAttributes
    relationships: AuthorizationRelationships
}

export type AuthorizationDeclined = BaseEvent & {
    type: "authorization.declined"
    attributes: {
        reason: string
    } & AuthorizationAttributes
    relationships: AuthorizationRelationships
}

export type AuthorizationAmountChanged = BaseEvent & {
    type: "authorization.amountChanged"
    attributes: {
        oldAmount: number
        newAmount: number
    }
    relationships: AuthorizationRelationships
}

type AuthorizationRequestRelationships = BaseEventRelationships & {
    authorizationRequest: Relationship
    card: Relationship
}

type AuthorizationRequestAttributes = BaseEventAttributes & {
    amount: number
    status: string
    partialApprovalAllowed: number
    merchant: Merchant
    recurring: boolean
}

export type AuthorizationRequestApproved = BaseEvent & {
    type: "authorizationRequest.approved"
    attributes: AuthorizationRequestAttributes & {
        approvedAmount: number
    }
    relationships: AuthorizationRequestRelationships
}

export type AuthorizationRequestPending = BaseEvent & {
    type: "authorizationRequest.pending"
    attributes: AuthorizationRequestAttributes & {
        available: number
        ecommerce?: boolean
        cardPresent?: boolean
        healthcareAmounts?: HealthcareAmounts
    }
    relationships: AuthorizationRequestRelationships
}

export type AuthorizationRequestDeclined = BaseEvent & {
    type: "authorizationRequest.declined"
    attributes: AuthorizationRequestAttributes & {
        declineReason: string
    }
    relationships: AuthorizationRequestRelationships
}

export type BulkPaymentsFailed = BaseEvent & {
    type: "bulkPayments.failed"
    attributes: {
        index: string
        error: string
        idempotencyKey?: string
    }
    relationships: {
        bulkPayments: Relationship
    }
}

export type BulkPaymentsFinished = BaseEvent & {
    type: "bulkPayments.finished"
    relationships: {
        bulkPayments: Relationship
    }
}

type CardEvents = CardActivated | CardStatusChanged

export type CardActivated = BaseEvent & {
    type: "card.activated"
    relationships: {
        card: Relationship
    } & BaseEventRelationships
}

export type CardStatusChanged = BaseEvent & {
    type: "card.statusChanged"
    attributes: {
        newStatus: string
        previousStatus: string
    }
    relationships: {
        card: Relationship
    } & BaseEventRelationships
}

type CustomerEvents = CustomerCreated | CustomerUpdated | CustomerArchived

export type CustomerCreated = BaseEvent & {
    type: "customer.created"
    relationships: {
        customer: Relationship
        application: Relationship
    }
}

export type CustomerUpdated = BaseEvent & {
    type: "customer.updated"
    relationships: {
        customer: Relationship
    }
}

export type CustomerArchived = BaseEvent & {
    type: "customer.archived"
    relationships: {
        customer: Relationship
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

type PaymentRelationships = BaseEventRelationships & {
    payment: Relationship
}

type PaymentAttributes = BaseEventAttributes & {
    direction: Direction
    amount: number
}

type PaymentEvents = PaymentCreated | PaymentClearing | PaymentCanceled | PaymentRejected | PaymentReturned | PaymentSent | PaymentPendingReview |
 ReceivedPaymentCreated | ReceivedPaymentAdvanced | ReceivedPaymentReturned | ReceivedPaymentCompleted | BulkPaymentsFailed | BulkPaymentsFinished |
 DeclinedIncomingPayment

export type PaymentCreated = BaseEvent & {
    type: "payment.created"
    attributes: {
        status: string
    }
    relationships: PaymentRelationships
}

export type PaymentClearing = BaseEvent & {
    type: "payment.clearing"
    attributes: PaymentAttributes & {
        previousStatus: string
    }
    relationships: PaymentRelationships
}

export type PaymentSent = BaseEvent & {
    type: "payment.sent"
    attributes: PaymentAttributes & {
        previousStatus: string
    }
    relationships: PaymentRelationships
}

export type PaymentReturned = BaseEvent & {
    type: "payment.returned"
    attributes: PaymentAttributes & {
        previousStatus: string
    }
    relationships: PaymentRelationships
}

export type PaymentRejected = BaseEvent & {
    type: "payment.rejected"
    attributes: PaymentAttributes & {
        reason: string
    }
    relationships: PaymentRelationships
}

export type PaymentCanceled = BaseEvent & {
    type: "payment.canceled"
    attributes: PaymentAttributes
    relationships: PaymentRelationships
}

export type PaymentPendingReview = BaseEvent & {
    type: "payment.pendingReview"
    attributes: PaymentAttributes
    relationships: PaymentRelationships
}

export type StatementsCreated = BaseEvent & {
    type: "statements.created"
    attributes: {
        period: string
    }
}

type TransactionEvents = TransactionCreated | TransactionUpdated

export type TransactionCreated = BaseEvent & {
    type: "transaction.created"
    attributes: {
        summary: string
        direction: Direction
        amount: number
    }
    relationships: {
        transaction: Relationship
        payment: Relationship
    } & BaseEventRelationships
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
        status: ReceivedPaymentStatus
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
    } & BaseEventRelationships
}

export type ReceivedPaymentAdvanced = BaseEvent & {
    type: "receivedPayment.advanced"
    attributes: {
        previousStatus: ReceivedPaymentStatus
        wasAdvanced: boolean
    }
    relationships: {
        receivedPayment: Relationship
    } & BaseEventRelationships
}

export type ReceivedPaymentCompleted = BaseEvent & {
    type: "receivedPayment.completed"
    attributes: {
        previousStatus: ReceivedPaymentStatus
        wasAdvanced: boolean
    }
    relationships: {
        receivedPayment: Relationship
    } & BaseEventRelationships
}

export type ReceivedPaymentReturned = BaseEvent & {
    type: "receivedPayment.returned"
    attributes: {
        previousStatus: ReceivedPaymentStatus
        wasAdvanced: boolean
    }
    relationships: {
        receivedPayment: Relationship
    } & BaseEventRelationships
}

export type ChargeBackCreated = BaseEvent & {
    type: "chargeback.created"
    attributes: {
        amount: number
        description: string
    }
    relationships: {
        chargeback: Relationship
        counterpartyAccount: Relationship
        transaction: Relationship
    } & BaseEventRelationships
}

type RewardEvents = RewardSent | RewardRejected

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

type CheckDepositRelationships = {
    checkDeposit: Relationship
} & BaseEventRelationships

type CheckDepositEvents = CheckDepositCreated | CheckDepositPendingReview | CheckDepositPending | CheckDepositRejected | CheckDepositClearing | CheckDepositSent | CheckDepositReturend

export type CheckDepositCreated = BaseEvent & {
    type: "checkDeposit.created"
    attributes: {
        status: string
    }
    relationships: CheckDepositRelationships
}

export type CheckDepositPendingReview = BaseEvent & {
    type: "checkDeposit.pendingReview"
    attributes: {
        previousStatus: string
    }
    relationships: CheckDepositRelationships
}

export type CheckDepositPending = BaseEvent & {
    type: "checkDeposit.pending"
    attributes: {
        previousStatus: string
    }
    relationships: CheckDepositRelationships
}

export type CheckDepositRejected = BaseEvent & {
    type: "checkDeposit.rejected"
    attributes: {
        previousStatus: string
        reason: string
    }
    relationships: CheckDepositRelationships
}

export type CheckDepositClearing = BaseEvent & {
    type: "checkDeposit.clearing"
    attributes: {
        previousStatus: string
    }
    relationships: CheckDepositRelationships
}

export type CheckDepositSent = BaseEvent & {
    type: "checkDeposit.sent"
    attributes: {
        previousStatus: string
    }
    relationships: CheckDepositRelationships
}

export type CheckDepositReturend = BaseEvent & {
    type: "checkDeposit.returned"
    attributes: {
        previousStatus: string
    }
    relationships: CheckDepositRelationships
}

export type DeclinedIncomingPayment = BaseEvent & {
    type: "declinedIncomingPayment.created"
    attributes: {
        amount: number
        direction: Direction
        reason: string
        paymentType: string
    }
    relationships: BaseEventRelationships
}

type DisputeEvents = DisputeCreated | DisputeStatusChanged

export type DisputeCreated = BaseEvent & {
    type: "dispute.created"
    attributes: {
        amount: number
        description: string
        source: string
        status: string
    }
    relationships: BaseEventRelationships & {
        dispute: Relationship
        transaction: Relationship
    }
}

export type DisputeStatusChanged = BaseEvent & {
    type: "dispute.statusChanged"
    attributes: {
        amount: number
        previousStatus: string
        newStatus: string
    }
    relationships: BaseEventRelationships & {
        dispute: Relationship
        transaction: Relationship
    }
}




