
import { Relationship } from "./common"

export type RecurringPaymentStatus = "Active" | "Completed" | "Disabled"

export type Interval = "Monthly"

export type RecurringPayment = RecurringCreditAchPayment

interface RecurringPaymentAttributes {
    /**
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     * The date the resource was created.
     */
    createdAt: string

    /**
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     * The date the resource was updated.
     */
    updatedAt: string

    /**
     * The amount (cents) of the payment.
     */
    amount: number

    /**
     * Payment description (maximum of 10 characters), also known as Company Entry Description, this will show up on statement of the counterparty.
     */
    description: string

    /**
     * Status of the recurring payment, one of: Active, Completed, Disabled.
     */
    status: RecurringPaymentStatus

    /**
     * Represents the number of payments that were created by this recurring payment.
     */
    numberOfPayments: number

    /**
     * The schedule of the recurring payment.
     */
    schedule: Schedule

    /**
     * See [Tags](https://developers.unit.co/#tags).
     */
    tags?: object
}

interface RecurringPaymentRelationships {
    /**
     * The Deposit Account originating the recurring payment.
     */
    account: Relationship

    /**
     * The org the customer belongs to.
     */
    org: Relationship

    /**
     * The Customer the deposit account belongs to. This relationship is only available if the account belongs to a single customer, business or individual.
     */
    customer?: Relationship
}

export interface RecurringCreditAchPayment {
    /**
     * Identifier of the recurring Credit ACH payment resource.
     */
    id: string

    /**
     * Type of the payment resource. For credit ach recurring payments the value is recurringCreditAchPayment.
     */
    type: "recurringCreditAchPayment"

    /**
     * JSON object representing the recurring payment resource.
     */
    attributes: {
        /**
         * Optional, additional payment description (maximum of 50 characters), not all institutions present that.
         */
        addenda?: string
    } & RecurringPaymentAttributes

    /**
     * JSON:API Relationships. Describes relationships between the Recurring Credit ACH payment and the originating deposit account and org.
     */
    relationships: {
        /**
         * The Counterparty the payment to be made to.
         */
        counterparty?: Relationship
    } & RecurringPaymentRelationships
}

export interface RecurringCreditBookPayment {
    /**
     * Identifier of the recurring credit book payment resource.
     */
    id: string

    /**
     * Type of the payment resource. The value is always recurringCreditBookPayment.
     */
    type: "recurringCreditBookPayment"

    /**
     * JSON object representing the recurring payment resource.
     */
    attributes: {
        /**
         * Represents the number of payments that were created by this recurring payment.
         */
        numberOfPayments: number

        /**
         * If this field is populated, its contents will be returned as the bookTransaction’s summary field (maximum of 100 characters).
         */
        transactionSummaryOverride?: string
    } & RecurringPaymentAttributes

    /**
     * JSON:API Relationships. Describes relationships between the Recurring Credit ACH payment and the originating deposit account and org.
     */
    relationships: {
        /**
         * The Counterparty account the payment to be made to.
         */
        counterpartyAccount?: Relationship
    } & RecurringPaymentRelationships
}

interface BaseSchedule {
    /**
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     * Optional. Start time of the recurring payment. Date only (e.g. "2022-06-29")
     */
    startTime?: string

    /**
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     * Optional. End time of the recurring payment. Date only (e.g. "2022-10-29 ")
     */
    endTime?: string

    /**
     * Optional. Scheduled day time in the month. Valid values can be between 1-28 or (-5)-(-1). 
     * Negative numbers represent relative day to the end of the month. -1 represents the last day of the month.
     */
    dayOfMonth?: number

    /**
     * Interval of the schedule. Can be Monthly.
     */
    interval?: Interval
}

export type CreateSchedule = BaseSchedule

export interface Schedule extends BaseSchedule {
    /**
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     * The next scheduled date of the action.
     */
    nextScheduledAction?: string
}

export type CreateRecurringPaymentRequest = CreateRecurringCreditAchPaymentRequest | CreateRecurringCreditBookPaymentRequest

interface CreateRecurringRequestAttributes {
    /**
     * The amount (cents) of the payment.
     */
    amount: number

    /**
     * Payment description (maximum of 10 characters), also known as Company Entry Description, this will show up on statement of the counterparty.
     */
    description: string

    /**
     * The schedule of the recurring payment.
     */
    schedule: CreateSchedule

    /**
     * See [Tags](https://developers.unit.co/#tags).
     */
    tags?: object
}

export interface CreateRecurringCreditAchPaymentRequest {
    type: "recurringCreditAchPayment"

    /**
     * JSON object representing the recurring payment resource.
     */
    attributes: {
        /**
         * Optional, additional payment description (maximum of 50 characters), not all institutions present that.
         */
        addenda?: string
    } & CreateRecurringRequestAttributes

    /**
     * JSON:API Relationships. Describes relationships between the Recurring Credit ACH payment and the originating deposit account and org.
     */
    relationships: {
        /**
         * The Deposit Account originating the recurring payment.
         */
        account: Relationship

        /**
         * The Counterparty the payment to be made to.
         */
        counterparty?: Relationship
    }
}

export interface CreateRecurringCreditBookPaymentRequest {
    type: "recurringCreditBookPayment"

    /**
     * JSON object representing the recurring payment resource.
     */
    attributes: {
        /**
         * Optional. If this field is populated, its contents will be returned as the bookTransaction’s summary field (maximum of 100 characters).
         */
        transactionSummaryOverride?: string
    } & CreateRecurringRequestAttributes

    /**
     * JSON:API Relationships. Describes relationships between the Recurring Credit ACH payment and the originating deposit account and org.
     */
    relationships: {
        /**
         * The Deposit Account originating the recurring payment.
         */
        account: Relationship

        /**
         * The Counterparty account to which the payment will be made.
         */
        counterpartyAccount?: Relationship
    }
}

