
import { Relationship } from "./common"

export type RecurringPaymentStatus = "Active" | "Completed" | "Disabled"

export type Interval = "Monthly"

export type RecurringPayment = RecurringCreditAchPayment 

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
         * RFC3339 Date string
         * The date the resource was created.
         */
        createdAt: string

        /**
         * RFC3339 Date string
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
         * Optional, additional payment description (maximum of 50 characters), not all institutions present that.
         */
        addenda?: string

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

    /**
     * JSON:API Relationships. Describes relationships between the Recurring Credit ACH payment and the originating deposit account and org.
     */
    relationships: {
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

        /**
         * The Counterparty the payment to be made to.
         */
        counterparty?: Relationship
    } 
}

export interface Schedule {
    /**
     * RFC3339 Date string
     * Start time of the recurring payment. Date only (e.g. "2022-06-29")
     */
    startTime: string

    /**
     * RFC3339 Date string
     * Start time of the recurring payment. Date only (e.g. "2022-06-29")
     */
    endTime: string

    /**
     * Scheduled day time in the month. Valid values can be between 1-28 or (-5)-(-1). Negative numbers represent relative day to the end of the month. -1 represents the last day of the month.
     */
    dayOfMonth: number

    /**
     * Interval of the schedule. Can be Monthly.
     */
    interval: Interval

    /**
     * RFC3339 Date string
     * The next scheduled date of the action.
     */
     nextScheduledAction: Interval
}

export interface CreateSchedule {
    /**
     * RFC3339 Date string
     * Optional. Start time of the recurring payment. Date only (e.g. "2022-06-29")
     */
    startTime?: string

    /**
     * RFC3339 Date string
     * 	Optional. End time of the recurring payment. Date only (e.g. "2022-10-29 ")
     */
    endTime?: string

    /**
     * Scheduled day time in the month. Valid values can be between 1-28 or (-5)-(-1). Negative numbers represent relative day to the end of the month. -1 represents the last day of the month.
     */
    dayOfMonth: number

    /**
     * Interval of the schedule. Can be Monthly.
     */
    interval: Interval
}

export type CreateRecurringPaymentRequest = CreateRecurringCreditAchPaymentRequest

export interface CreateRecurringCreditAchPaymentRequest {
    type: "recurringCreditAchPayment"

    /**
     * JSON object representing the recurring payment resource.
     */
     attributes: {
        /**
         * The amount (cents) of the payment.
         */
        amount: number

        /**
         * Payment description (maximum of 10 characters), also known as Company Entry Description, this will show up on statement of the counterparty.
         */
        description: string

        /**
         * Optional, additional payment description (maximum of 50 characters), not all institutions present that.
         */
        addenda?: string

        /**
         * The schedule of the recurring payment.
         */
        schedule: CreateSchedule

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags?: object
     }

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

