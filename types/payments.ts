import { Relationship, Counterparty, WireCounterparty, Direction, RelationshipsArray, Tags, PushToCardConfiguration } from "./common"

export type PaymentStatus = "Pending" | "PendingReview" | "Rejected" | "Clearing" | "Sent" | "Canceled" | "Returned"

export type Payment = AchPayment | BookPayment | WirePayment | BillPayment | PushToCardPayment

interface BasePaymentAttributes {
    /**
     * Date only. The date the resource was created.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    createdAt: string

    /**
     * One of Pending, Rejected, Clearing, Sent, Canceled, Returned. See [ACH Status](https://developers.unit.co/#ach-status).
     */
    status: PaymentStatus

    /**
     * (Optional) More information about the status.
     */
    reason?: string

    /**
     * The direction in which the funds flow (either Debit or Credit).
     */
    direction: Direction

    /**
     * Payment description (maximum of 10 characters), also known as Company Entry Description, this will show up on statement of the counterparty.
     */
    description: string

    /**
     * The amount (cents) of the payment.
     */
    amount: number

    /**
     * See [Tags](https://developers.unit.co/#tags).
     */
    tags?: Tags
}

interface BasePaymentRelationships {
    /**
     * The Deposit Account of the customer.
     */
    account: Relationship

    /**
     * The Customer the deposit account belongs to. This relationship is only available if the account belongs to a single customer, business or individual.
     */
    customer?: Relationship

    /**
     * The list of Customers the deposit account belongs to. This relationship is only available if the account belongs to a multiple individual customers.
     */
    customers?: RelationshipsArray

    /**
     * The Book Transaction generated by this payment.
     */
    transaction?: Relationship
}

export interface AchPayment {
    /**
     * Identifier of the ACH payment resource.
     */
    id: string

    /**
     * Type of the payment resource. For originations the value is achPayment.
     */
    type: "achPayment"

    /**
     * JSON object representing the payment resource.
     */
    attributes: {
        /**
         * The party on the other side of the ACH payment.
         */
        counterparty: Counterparty

        /**
         * Optional, additional payment description (maximum of 50 characters), not all institutions present that.
         */
        addenda?: string

        /**
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         * Optional, For Clearing, shows the date on which the payment will be settled.
         */
        settlementDate?: string

        /**
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         * Optional, For ACH credit with statuses Pending,Sent, shows the date on which the counterparty will handle the request.
         */
        expectedCompletionDate?: string

        /**
         * Optional, shows the verification method of the counterparty : 'Plaid'.
         */
        counterpartyVerificationMethod?: string

        /**
         * Optional, default is false. See [Same Day ACH](https://docs.unit.co/ach-origination/#same-day-ach).
         */
        sameDay?: boolean

        /**
         * Optional. The 3-letter ACH Standard Entry Class (SEC) Code (e.g. WEB, CCD, PPD, etc.).
         */
        secCode?: string
    } & BasePaymentAttributes

    /**
     * Describes relationships between the ACH payment and the originating deposit account and customer.
     */
    relationships: {
        /**
         * The Counterparty the payment to be made to.
         */
        counterparty: Relationship

        /**
         * The recurring payment belonging to this payment.
         */
        recurringPayment?: Relationship
    } & BasePaymentRelationships
}

export interface BookPayment {
    /**
     * 	Identifier of the book payment resource.
     */
    id: string

    /**
     * Type of the payment resource. The value is always bookPayment.
     */
    type: "bookPayment"

    /**
     * JSON object representing the payment resource.
     */
    attributes: {
        /**
         * If this field is populated, its contents will be returned as the bookTransaction’s summary field (maximum of 100 characters).
         */
        transactionSummaryOverride?: string
    } & BasePaymentAttributes

    /**
     * Describes relationships between the Book payment and the originating deposit account and customer.
     */
    relationships: {
        /**
         * The Counterparty account the payment to be made to.
         */
        counterpartyAccount: Relationship

        /**
         * The Customer the counterparty account belongs to. The customer is either a business or an individual, might be empty if there is more than one associated customer.
         */
        counterpartyCustomer: Relationship

        /**
         * The recurring payment belonging to this payment.
         */
        recurringPayment?: Relationship
    } & BasePaymentRelationships
}

export interface WirePayment {
    /**
     * Identifier of the Wire payment resource.
     */
    id: string

    /**
     * Type of the payment resource. For originations the value is wirePayment.
     */
    type: "wirePayment"

    /**
     * JSON object representing the payment resource.
     */
    attributes: {

        /**
         * The party on the other side of the Wire payment.
         */
        counterparty: WireCounterparty

    } & BasePaymentAttributes

    /**
     * Describes relationships between the Wire payment and the originating deposit account and customer.
     */
    relationships: BasePaymentRelationships
}

export interface BillPayment {
    /**
     * Identifier of the bill payment resource.
     */
    id: string

    /**
     * Type of the payment resource. The value is always billPayment.
     */
    type: "billPayment"

    /**
     * JSON object representing the payment resource.
     */
    attributes: Pick<BasePaymentAttributes, "createdAt" | "status" | "direction" | "description" | "amount" | "tags">

    /**
     * Describes relationships between the Wire payment and the originating deposit account and customer.
     */
    relationships: BasePaymentRelationships
}

export type ReceivedPaymentStatus = "Pending" | "Advanced" | "Completed" | "Returned"

export interface AchReceivedPayment {
    /**
     * Identifier of the received payment resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always achReceivedPayment.
     */
    type: "achReceivedPayment"

    /**
     * JSON object representing the transaction data.
     */
    attributes: {
        /**
         * The status of the Received Payment.
         * One of Pending, Advanced, Completed or Returned, see (ReceivedPayment Statuses)[https://docs.unit.co/received-ach/#statuses].
         * Common to all received payment types.
         */
        status: ReceivedPaymentStatus

        /**
         * Will be true if the received payment was or is being Advanced (has or has had the status Advanced).
         * Common to all received payment types.
         */
        wasAdvanced: boolean

        /**
         * Optional. Will be true if the received payment can be Advanced.
         */
        isAdvaceable?: boolean // TODO: typo, will be fixed on API and be removed in a future version
        isAdvanceable?: boolean

        /**
         * Shows the date on which the received ACH will be completed(settled or repaid).
         */
        completionDate: string

        /**
         * The reason if the received payment is Returned. See ACH return reasons.
         */
        returnReason?: string

        /**
         * Optional. Additional transaction description (maximum of 50 characters).
         */
        addenda?: string

        /**
         * The name by which the originator is known to the receiver.
         */
        companyName: string

        /**
         * The routing number of the party that originated the received ACH payment.
         */
        counterpartyRoutingNumber: string

        /**
         * The account number of the party that originated the received ACH payment.
         */
        counterpartyAccountNumber: string

        /**
         * Optional. The name of the Recipient as it was declared by the originator of the payment.
         */
        receivingEntityName?: string

        /**
         * The ACH Trace Number.
         */
        traceNumber: string

        /**
         * Optional. The 3-letter ACH Standard Entry Class (SEC) Code (e.g. WEB, CCD, PPD, etc.).
         */
        secCode?: string

        /**
         * Optional, default is false. See [Same Day ACH](https://docs.unit.co/ach-origination/#same-day-ach).
         */
        sameDay?: boolean
    } & Pick<BasePaymentAttributes, "createdAt" | "amount" | "direction" | "description" | "tags">

    /**
     * Describes relationships between the transaction resource and other resources (account, customer related transactions).
     */
    relationships: {
        /**
         * The transaction of the received payment, created due to advance or when the ACH is processed.
         */
        receivePaymentTransaction?: Relationship

        /**
         * The transaction that funded the Advance from the provisional credit operating account, if the received payment was advanced.
         */
        paymentAdvanceTransaction?: Relationship

        /**
         * The transaction that repaid the advance once the received payment is completed.
         */
        repayPaymentAdvanceTransaction?: Relationship
    } & Pick<BasePaymentRelationships, "account" | "customer">
}

export interface PatchPaymentRequest {
    type: "achPayment" | "bookPayment" | "achReceivedPayment"
    attributes: {
        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: Tags
    }
}

export type CreatePaymentRequest = CreateWirePaymentRequest | CreateBookPaymentRequest | CreateInlinePaymentRequest | CreateLinkedPaymentRequest | CreateVerifiedPaymentRequest | CreatePushToCardPaymentRequest

export interface PushToCardPayment {
    /**
     * Identifier of the received payment resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always pushToCardPayment.
     */
    type: "pushToCardPayment"

    attributes: BasePaymentAttributes & {
        /**
         * In case the payment status is 'Sent', it is the generated astra routine id
         */
        astraRoutineId?: string
    }

    relationships: BasePaymentRelationships & {
        /**
         * The ACH Payment generated by this payment.
         */
        achPayment: Relationship
    }
}

interface BaseAchPaymentCreateRequestAttributes {
        /**
         * The amount (in cents).
         */
        amount: number

        /**
         * The direction in which the funds flow.
         */
        direction: Direction

        /**
        * Payment description (maximum of 10 characters), also known as Company Entry Description, this will show up on statement of the counterparty.
        */
        description: string

        /**
         * Optional, additional payment description (maximum of 50 characters), not all institutions present that.
         */
        addenda?: string

        /**
         * Optional, default is false. Verify the counterparty balance, if balance verification fails the payment will be rejected with reason set to CounterpartyInsufficientFunds
         */
        verifyCounterpartyBalance?: boolean

        /**
         * Optional, default is false. See [Same Day ACH](https://docs.unit.co/ach-origination/#same-day-ach).
         */
        sameDay?: boolean

        /**
         * See [Idempotency](https://docs.unit.co/#intro-idempotency).
         */
        idempotencyKey?: string
        
        /**
         * See [Tags](https://developers.unit.co/#tags). Tags that will be copied to any transaction that this payment creates (see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
         */
        tags?: Tags

        /**
         * Optional. See [Use a custom SEC Code](https://docs.unit.co/ach-origination/#use-a-custom-sec-code).
         */
        secCode?: string
}

export interface CreateWirePaymentRequest {
    type: "wirePayment"

    attributes: {
        /**
         * The amount (in cents).
         */
        amount: number

        /**
         * Payment description (maximum of 50 characters), this will show up on statement of the counterparty.
         */
        description: string

        /**
         * The party on the other side of the Wire payment.
         */
        counterparty: WireCounterparty

        /**
         * See Idempotency.
         */
        idempotencyKey?: string

        /**
         * See [Tags](https://developers.unit.co/#tags). Tags that will be copied to any transaction that this payment creates (see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
         */
        tags?: Tags
    }

    relationships: {
        /**
         * The Deposit Account originating the payment.
         */
        account: Relationship
    }
}

export interface CreateBookPaymentRequest {
    type: "bookPayment"

    attributes: {
        /**
         * The amount (in cents).
         */
        amount: number

        /**
         * Debit or Credit
         */
        direction?: "Debit" | "Credit"

        /**
         * Payment description (maximum of 50 characters), this will show up on statement of the counterparty.
         */
        description: string

        /**
         * See Idempotency.
         */
        idempotencyKey?: string

        /**
         * See [Tags](https://developers.unit.co/#tags). Tags that will be copied to any transaction that this payment creates (see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
         */
        tags?: Tags
    }

    relationships: {
        /**
         * The Deposit Account originating the payment.
         */
        account: Relationship

        /**
         * The Counterparty account the payment to be made to
         */
        counterpartyAccount: Relationship
    }
}

export interface CreateInlinePaymentRequest {
    type: "achPayment"

    attributes: {
        /**
         * The party on the other side of the ACH payment.
         */
        counterparty: Counterparty
    } & BaseAchPaymentCreateRequestAttributes

    relationships: {
        /**
         * The Deposit Account originating the payment.
         */
        account: Relationship
    }

}

export interface CreateLinkedPaymentRequest {
    type: "achPayment"

    attributes: BaseAchPaymentCreateRequestAttributes

    relationships: {
        /**
         * The Deposit Account originating the payment.
         */
        account: Relationship

        /**
         * The Counterparty the payment to be made to.
         */
        counterparty: Relationship
    }
}

export interface CreateVerifiedPaymentRequest {
    type: "achPayment"

    attributes: {
        /**
         * Name of the person or company that owns the counterparty bank account.
         */
        counterpartyName?: string

        /**
         * See [Create Plaid processor token API](https://plaid.com/docs/api/processors/).
         */
        plaidProcessorToken: string
    } & BaseAchPaymentCreateRequestAttributes

    relationships: {
        /**
         * The Deposit Account originating the payment.
         */
        account: Relationship
    }
}

export interface BulkPayments {
  type: "bulkPayments"
  attributes: {
    bulkId: string
  }
}

export interface CreatePushToCardPaymentRequest {
    type: "pushToCardPayment"
    attributes: {
        /**
         * Amount to be sent to the card (in cents)
         */
        amount: number

        /**
         * Payment description (maximum of 50 characters)
         */
        description: string

        /**
         * Provider configuration.
         */
        configuration: PushToCardConfiguration

        /**
         * See [Idempotency](https://docs.unit.co/#intro-idempotency)
         */
        idempotencyKey?: string

        /**
         * See [Tags](https://docs.unit.co/#tags)
         */
        tags?: Tags
    }
    relationships: {
        account: Relationship
    }
}
