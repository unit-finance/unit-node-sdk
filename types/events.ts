import { Direction, HealthcareAmounts, Merchant, Relationship, Tags, UnimplementedFields, UnimplementedRelationships } from "./common"
import { ReceivedPaymentStatus } from "./payments"

export type UnitEvent = AccountEvents | ApplicationEvents | AuthorizationEvents | CardEvents | CustomerEvents | DocumentEvents |
 CheckDepositEvents | PaymentEvents | RecurringPaymentEvents | StatementsCreated | TransactionEvents |
 ChargeBackCreated | RewardEvents | DisputeEvents | RepaymentEvents | StopPaymentEvents | CheckPaymentEvents | TaxFormEvents | CreditApplicationEvents

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

export type AccountEvents = AccountCreated | AccountClosed | AccountFrozen | AccountReopened | AccountUnfrozen

export type AccountCreated = BaseEvent & {
    type: "account.created"
    relationships: BaseEventRelationships
}

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

export type ApplicationEvents = ApplicationCanceled | ApplicationDenied | ApplicationAwaitingDocuments | ApplicationPendingReview | ApplicationCreated

export type ApplicationCanceled = BaseEvent & {
    type: "application.canceled"
    relationships: {
        application: Relationship
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

export type ApplicationCreated = BaseEvent & {
    type: "application.created"
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

export type AuthorizationEvents = AuthorizationCreated | AuthorizationCanceled | AuthorizationDeclined | AuthorizationAmountChanged | AuthorizationRequestApproved | AuthorizationRequestPending | AuthorizationRequestDeclined | AuthorizationUpdated

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
        merchant: Merchant
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

export type AuthorizationUpdated = BaseEvent & {
    type: "authorization.updated"
    relationships: AuthorizationRelationships
}

type AuthorizationRequestRelationships = BaseEventRelationships & {
    authorizationRequest: Relationship
    card: Relationship
}

type AuthorizationRequestAttributes = BaseEventAttributes & {
    amount: number
    status: string
    partialApprovalAllowed: boolean
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
        surcharge?: number
        mustBeApproved?: boolean
        direction?: string
        healthCareAmounts?: HealthcareAmounts

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

export type CardEvents = CardCreated | CardActivated | CardStatusChanged

export type CardCreated = BaseEvent & {
    type: "card.created"
    relationships: {
        card: Relationship
    } & BaseEventRelationships
}

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

export type CustomerEvents = CustomerCreated | CustomerUpdated | CustomerArchived

export type CustomerCreated = BaseEvent & {
    type: "customer.created"
    relationships: {
        customer: Relationship
        application: Relationship
    }
}

export type CustomerUpdated = BaseEvent & {
    type: "customer.updated"
    attributes:{
        changes?: object
    }
    relationships: {
        customer: Relationship
    }
}

export type CustomerArchived = BaseEvent & {
    type: "customer.archived"
    attributes: {
        archiveReason: string
    } & BaseEventAttributes
    relationships: {
        customer: Relationship
    }
}

export type CreditApplicationEvents = CreditApplicationCreated | CreditDecisionApproved

export type CreditApplicationCreated = BaseEvent & {
    type: "creditApplication.created"
    relationships: CreditApplicationEventRelationships
}

export interface CreditApplicationEventRelationships {
    creditApplication: Relationship
    lendingProgram: Relationship
    application: Relationship
}

export type CreditDecisionApproved = BaseEvent & {
    type: "creditDecision.approved"
    attributes: CreditDecisionApprovedAttributes
    relationships: CreditDecisionEventRelationships
}

export interface CreditDecisionApprovedAttributes extends BaseEventAttributes {
    evaluationType: string
}

export interface CreditDecisionEventRelationships {
    creditDecision: Relationship
    application: Relationship
}

export type DocumentEvents = DocumentApproved | DocumentRejected

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

export type PaymentEvents =
    | PaymentCreated
    | PaymentClearing
    | PaymentCanceled
    | PaymentRejected
    | PaymentReturned
    | PaymentSent
    | PaymentPendingReview
    | ReceivedPaymentCreated
    | ReceivedPaymentAdvanced
    | ReceivedPaymentReturned
    | ReceivedPaymentMarkedForReturn
    | ReceivedPaymentCompleted
    | BulkPaymentsFailed
    | BulkPaymentsFinished
    | DeclinedIncomingPayment

export type PaymentCreated = BaseEvent & {
    type: "payment.created"
    attributes: {
        status: string
        amount: number
        direction: Direction
    }
    relationships: PaymentRelationships
}

export type PaymentClearing = BaseEvent & {
    type: "payment.clearing"
    attributes: PaymentAttributes & {
        previousStatus: string
        available: number
    }
    relationships: PaymentRelationships
}

export type PaymentSent = BaseEvent & {
    type: "payment.sent"
    attributes: PaymentAttributes & {
        previousStatus: string
        available: number
    }
    relationships: PaymentRelationships
}

export type PaymentReturned = BaseEvent & {
    type: "payment.returned"
    attributes: PaymentAttributes & {
        previousStatus: string
        available: number
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

type RecurringPaymentStatus = "Active" | "Completed" | "Disabled"

type RecurringPaymentAttributes = BaseEventAttributes & {
    amount: number
}

type RecurringPaymentRelationships = BaseEventRelationships & {
    recurringPayment: Relationship
}

export type RecurringPaymentEvents = RecurringPaymentCreated | RecurringPaymentStatusChanged | RecurringPaymentFailed

export type RecurringPaymentCreated = BaseEvent & {
    type: "recurringPayment.created"
    attributes: {
        status: RecurringPaymentStatus
        nextScheduledAction: string
    } & RecurringPaymentAttributes
    relationships: RecurringPaymentRelationships
}

export type RecurringPaymentStatusChanged = BaseEvent & {
    type: "recurringPayment.statusChanged"
    attributes: {
        status: RecurringPaymentStatus
        previousStatus: RecurringPaymentStatus
        numberOfPayments: number
    } & RecurringPaymentAttributes
    relationships: RecurringPaymentRelationships
}

export type RecurringPaymentFailed = BaseEvent & {
    type: "recurringPayment.failed"
    attributes: {
        error: string
    } & RecurringPaymentAttributes
    relationships: RecurringPaymentRelationships
}

export type StatementsCreated = BaseEvent & {
    type: "statements.created"
    attributes: {
        period: string
    }
}

export type TransactionEvents = TransactionCreated | TransactionUpdated

export type TransactionCreated = BaseEvent & {
    type: "transaction.created"
    attributes: {
        summary: string
        direction: Direction
        amount: number
        available: number
        balance: number
    }
    relationships: {
        transaction: Relationship
        payment?: Relationship
        card?: Relationship
        authorization?: Relationship
        checkDeposit?: Relationship
    } & BaseEventRelationships
}

export type TransactionUpdated = BaseEvent & {
    type: "transaction.updated"
    attributes: {
        interchange: number
        grossInterchange: number
    }
    relationships: {
        transaction: Relationship
    }
}

export type ReceivedPaymentCreated = BaseEvent & {
    type: "receivedPayment.created"
    attributes: {
        status: ReceivedPaymentStatus
        direction: Direction
        type: string
        amount: number
        isAdvaceable: boolean // TODO: typo, will be fixed on API and be removed in a future version
        isAdvanceable: boolean
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

export type ReceivedPaymentMarkedForReturn = BaseEvent & {
    type: "receivedPayment.markedForReturn"
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

export type StopPaymentCreated = BaseEvent & {
    type: "stopPayment.created"
    relationships: {
        stopPayment: Relationship
    } & BaseEventRelationships
}

export type StopPaymentStopped = BaseEvent & {
    type: "stopPayment.paymentStopped"
    attributes: {
        stoppedPaymentType: string
    } & BaseEventAttributes
    relationships: {
        stopPayment: Relationship
        stoppedPayment: Relationship
    } & BaseEventRelationships
}

export type StopPaymentDisabled = BaseEvent & {
    type: "stopPayment.disabled"
    attributes: {
        status: string
        previousStatus: string
    } & BaseEventAttributes
    relationships: {
        stopPayment: Relationship
    } & BaseEventRelationships
}

export type StopPaymentEvents = StopPaymentCreated | StopPaymentStopped | StopPaymentDisabled

export type CheckPaymentEvents = CheckPaymentCreated | CheckPaymentMarkedForReturn | CheckPaymentProcessed | CheckPaymentReturned | CheckPaymentAdditionalVerificationRequired | CheckPaymentAdditionalVerificationApproved | CheckPaymentPending | CheckPaymentCanceled | CheckPaymentDelivered | CheckPaymentInProduction | CheckPaymentInDelivery | CheckPaymentDeliveryStatusChanged | CheckPaymentReturnToSender

export type CheckPaymentCreated = BaseEvent & {
    type: "checkPayment.created"
    attributes: {
        status: string
        additionalVerificationStatus: boolean
    } & BaseEventAttributes
    relationships: {
        checkPayment: Relationship
        transaction: Relationship
    } & BaseEventRelationships
}

export type CheckPaymentMarkedForReturn = BaseEvent & {
    type:"checkPayment.markedForReturn"
    attributes: {
        previousStatus: string
    } & BaseEventAttributes
    relationships: {
        checkPayment: Relationship
    } & BaseEventRelationships
}

export type CheckPaymentProcessed = BaseEvent & {
    type: "checkPayment.processed"
    attributes: {
        previousStatus: string
        additionalVerificationStatus: boolean
    } & BaseEventAttributes
    relationships: {
        checkPayment: Relationship
        transaction: Relationship
    } & BaseEventRelationships
}

export type CheckPaymentReturned = BaseEvent & {
    type: "checkPayment.returned"
    attributes: {
        previousStatus: string
    } & BaseEventAttributes
    relationships: {
        checkPayment: Relationship
    } & BaseEventRelationships
}

export type CheckPaymentPending = BaseEvent & {
    type: "checkPayment.pending"
    attributes: {
        previousStatus: string
        additionalVerificationStatus: boolean
    } & BaseEventAttributes
    relationships: {
        checkPayment: Relationship
        transaction: Relationship
    } & BaseEventRelationships
}

export type CheckPaymentInProduction = BaseEvent & {
    type:"checkPayment.inProduction"
    attributes: {
        previousStatus: string
    } & BaseEventAttributes
    relationships: {
        checkPayment: Relationship
    } & BaseEventRelationships
}

export type CheckPaymentInDelivery = BaseEvent & {
    type:"checkPayment.inDelivery"
    attributes: {
        previousStatus: string
        deliveryStatus: string
        trackedAt: string
    } & BaseEventAttributes
    relationships: {
        checkPayment: Relationship
    } & BaseEventRelationships
}

export type CheckPaymentDelivered = BaseEvent & {
    type:"checkPayment.delivered"
    attributes: {
        previousStatus: string
    } & BaseEventAttributes
    relationships: {
        checkPayment: Relationship
    } & BaseEventRelationships
}

export type CheckPaymentReturnToSender = BaseEvent & {
    type:"checkPayment.returnToSender"
    attributes: {
        previousStatus: string
    } & BaseEventAttributes
    relationships: {
        checkPayment: Relationship
    } & BaseEventRelationships
}

export type CheckPaymentAdditionalVerificationRequired = BaseEvent & {
    type: "checkPayment.additionalVerificationRequired"
    attributes: {
        status: string
        amount: number
    } & BaseEventAttributes
    relationships: {
        checkPayment: Relationship
    } & BaseEventRelationships
}

export type CheckPaymentDeliveryStatusChanged = BaseEvent & {
    type: "checkPayment.deliveryStatusChanged"
    attributes: {
        status: string
        previousDeliveryStatus: string
        NewDeliveryStatus: string
        trackedAt: string
        postalCode: string
    } & BaseEventAttributes
    relationships: {
        checkPayment: Relationship
    } & BaseEventRelationships
}

export type CheckPaymentAdditionalVerificationApproved = BaseEvent & {
    type: "checkPayment.additionalVerificationApproved"
    attributes: {
        status: string
        amount: number
    } & BaseEventAttributes
    relationships: {
        checkPayment: Relationship
    } & BaseEventRelationships
}


export type CheckPaymentCanceled = BaseEvent & {
    type:"checkPayment.canceled"
    attributes: {
        previousStatus: string
    } & BaseEventAttributes
    relationships: {
        checkPayment: Relationship
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

export type RewardEvents = RewardSent | RewardRejected

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

export type CheckDepositEvents = CheckDepositCreated | CheckDepositPendingReview | CheckDepositPending | CheckDepositRejected | CheckDepositClearing | CheckDepositSent | CheckDepositReturned

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

export type CheckDepositReturned = BaseEvent & {
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

export type DisputeEvents = DisputeCreated | DisputeStatusChanged

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

export type RepaymentCreated = BaseEvent & {
    type: "repayment.created"
    attributes: {
        amount: number
        status: string
    }
    relationships: BaseEventRelationships & {
        repayment: Relationship
        payment: Relationship
    }
}

export type RepaymentStatusChanged = BaseEvent & {
    type: "repayment.statusChanged"
    attributes: {
        amount: number
        newStatus: string
        previousStatus: string
    }
    relationships: BaseEventRelationships & {
        repayment: Relationship
        payment: Relationship
    }
}

export type RepaymentEvents = RepaymentCreated | RepaymentStatusChanged

export type TaxFormCreated = BaseEvent & {
    type: "taxForm.created"
    attributes: {
        taxYear: string
        formType: string
        revision: number
    }
    relationships: {
        taxForm: Relationship
        customer: Relationship
    }
}

export type TaxFormUpdated = BaseEvent & {
    type: "taxForm.updated"
    attributes: {
        taxYear: string
        formType: string
        revision: number
    }
    relationships: {
        taxForm: Relationship
        customer: Relationship
    }
}

export type TaxFormEvents = TaxFormCreated | TaxFormUpdated