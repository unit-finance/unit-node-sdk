import { BaseCreateAchRepaymentRequest, BaseCreateBookRepaymentRequest, BaseCreateCapitalPartnerAchRepaymentRequest, BaseCreateCapitalPartnerBookRepaymentRequest } from "./baseRepaymentTypes"
import { Relationship, Schedule, Tags } from "./common"


export type CreateRecurringAchRepaymentRequest = BaseCreateAchRepaymentRequest & {
    type: "recurringAchRepayment"
}

export type CreateRecurringBookRepaymentRequest = BaseCreateBookRepaymentRequest & {
    type: "recurringBookRepayment"
}

export type CreateRecurringCapitalPartnerAchRepaymentRequest = BaseCreateCapitalPartnerAchRepaymentRequest & {
    type: "recurringCapitalPartnerAchRepayment"
}

export type CreateRecurringCapitalPartnerBookRepaymentRequest = BaseCreateCapitalPartnerBookRepaymentRequest & {
    type: "recurringCapitalPartnerBookRepayment"
}

export type CreateRecurringRepaymentRequest = CreateRecurringAchRepaymentRequest | CreateRecurringBookRepaymentRequest | CreateRecurringCapitalPartnerAchRepaymentRequest | CreateRecurringCapitalPartnerBookRepaymentRequest

export type RecurringRepaymentStatus = "Active" | "Disabled"

type BaseRecurringRelationships = {
    /**
    * Optional. The [Customer](https://www.unit.co/docs/api/customers/) the credit account belongs to. This relationship is only available if the account belongs to a single customer, business or individual
    */
    customer?: Relationship

    /**
    * The org the customer belongs to
    */
    org: Relationship

    /**
    * The [Credit Account](https://www.unit.co/docs/api/credit-accounts/) the repayment is made for
    */
    creditAccount: Relationship

    /**
    * The [Counterparty](https://www.unit.co/docs/api/payments-counterparties/) the repayment to be made from
    */
    counterparty: Relationship
}

type NonPartnerRecurringRelationships = BaseRecurringRelationships & {
    /**
    * The [Deposit Account](https://www.unit.co/docs/api/deposit-accounts/) originating the repayment
    */
    account: Relationship
}

type BaseRecurringRepayment = {
    id: string

    type: string

    attributes: {
        /**
         * The date the resource was created
         */
        createdAt: string

        /**
         * The date the resource was updated
         */
        updatedAt: string

        /**
         * The schedule of the recurring payment
         */
        schedule: Schedule

        /**
         * 	Status of the recurring repayment
         */
        status: RecurringRepaymentStatus

        /**
         * Repayment description (maximum of 50 characters). this will show up on the statement of the counterparty
         */
        description: string

        /**
         * 	Represents the number of repayments that were created by this recurring payment
         */
        numberOfPayments: number

        /**
         * Optional. See [Tags](https://www.unit.co/docs/#tags). Tags that will be copied to any transaction that this payment creates (see [Tag Inheritance](https://www.unit.co/docs/#tag-inheritance))
         */
        tags?: Tags
    }
}

type BaseRecurringAchRepayment = BaseRecurringRepayment & {
    attributes: {
        /**
         * Optional, additional payment description (maximum of 80 characters), not all institutions present that
         */
        addenda?: string

        /**
         * Optional, default is false. See [Same Day ACH](https://www.unit.co/docs/api/ach-origination/#same-day-ach)
         */
        sameDay?: boolean

        /**
         * Optional. See Use a custom SEC Code. See [SEC Codes](https://www.unit.co/docs/api/ach-origination/#use-a-custom-sec-code)
         */
        secCode?: string
    }
}

type BaseRecurringBookRepayment = BaseRecurringRepayment & {
    attributes: {
        /**
         * 	If this field is populated, its contents will be returned as the [bookTransaction](https://www.unit.co/docs/api/resources/#transaction-book)’s [summary](https://www.unit.co/docs/api/transactions/#transaction-summaries) field (maximum of 100 characters).
         */
        transactionSummaryOverride?: string
    }
}

export type RecurringAchRepayment = BaseRecurringAchRepayment & {
    type: "recurringAchRepayment"
    relationships: NonPartnerRecurringRelationships
}

export type RecurringBookRepayment = BaseRecurringBookRepayment & {
    type: "recurringBookRepayment"
    relationships: NonPartnerRecurringRelationships
}

export type RecurringCapitalPartnerAchRepayment = BaseRecurringAchRepayment & {
    type: "recurringCapitalPartnerAchRepayment"
    relationships: BaseRecurringRelationships
}

export type RecurringCapitalPartnerBookRepayment = BaseRecurringBookRepayment & {
    type: "recurringCapitalPartnerBookRepayment"
    relationships: BaseRecurringRelationships
}

export type RecurringRepayment = RecurringAchRepayment | RecurringBookRepayment | RecurringCapitalPartnerAchRepayment | RecurringCapitalPartnerBookRepayment