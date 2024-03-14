import { BaseCreateRequestAttributes, Relationship, Tags } from "./common"


type BaseCreateRepaymentRequest = {
    type: string

    attributes: {
        /**
         * Payment description (maximum of 50 characters), also known as Company Entry Description, this will show up on statement of the counterparty.
         */
        description: string

        /**
         * The amount (Cents) to repay.
         */
        amount: number 
    } & BaseCreateRequestAttributes

    relationships: {
        /**
         * The [Credit Account](https://www.unit.co/docs/api/resources/#credit-account) that the repayment is made against.
         */
        creditAccount: Relationship
    }
}

type BaseCreateBookRepaymentRequest = BaseCreateRepaymentRequest & {
    attributes: {
        /**
         * If this field is populated, its contents will be returned as the [bookTransaction](https://www.unit.co/docs/api/resources/#transaction-book)’s [summary](https://www.unit.co/docs/api/transactions/#transaction-summaries) field (maximum of 100 characters).
         */
        transactionSummaryOverride?: string
    }

    relationships: {
        /**
         * The Deposit Account the repayment funds are taken from.
         */
        counterpartyAccount: Relationship
    }
}

export type CreateBookRepaymentRequest = BaseCreateBookRepaymentRequest & {
    type: "bookRepayment"

    relationships: {
        /**
         * The [Deposit Account](https://www.unit.co/docs/api/deposit-accounts/) the repayment will be deposited to.
         */
        account: Relationship
    }
}

export type CreateCapitalPartnerBookRepayment = BaseCreateBookRepaymentRequest & { 
    type: "capitalPartnerBookRepayment"
}

type BaseAchRepaymentRequest = BaseCreateRepaymentRequest & {
    attributes: {
        /**
         * Optional, additional payment description (maximum of 80 characters), not all institutions present that.
         */
        addenda?: string
        
        /**
         * 	Optional, default is false. See [Same Day ACH](https://www.unit.co/docs/api/ach-origination/#same-day-ach).
         */
        sameDay?: boolean

        /**
         * Optional. See [Use a custom SEC code](https://www.unit.co/docs/api/ach-origination/#use-a-custom-sec-code).
         */
        secCode?: string
    }

    relationships: { 
        /**
         * The [ACH Counterparty](https://www.unit.co/docs/api/resources/#counterparty-resource) the repayment will come from.
         */
        counterparty: Relationship
    }
}

export type CreateAchRepaymentRequest = BaseAchRepaymentRequest & {
    type: "achRepayment"

    relationships: {
        /**
        * The [Deposit Account](https://www.unit.co/docs/api/deposit-accounts/) the repayment will be deposited to.
        */
        account: Relationship
    }
}

export type CreateCapitalPartnerAchRepaymentRequest = BaseAchRepaymentRequest & {
    type: "capitalPartnerAchRepayment"
}

export type CreateRepaymentRequest = CreateBookRepaymentRequest | CreateCapitalPartnerBookRepayment | CreateAchRepaymentRequest | CreateCapitalPartnerAchRepaymentRequest

type BaseRepayment = {
    /**
     * Identifier of the ACH repayment resource.
     */
    id: string

    /**
     * 	Type of the repayment resource.
     */
    type: string

    /**
     * JSON object representing the repayment resource.
     */
    attributes: {
        /**
         * The date the resource was created.
         */
        createdAt: string

        /**
         * The date the resource was updated.
         */
        updatedAt: string

        /**
         * The amount (cents) of the payment.
         */
        amount: number

        /**
         * Either Pending, PendingReview, Returned, Sent or Rejected
         */
        status: "Pending" | "PendingReview" | "Returned" | "Sent" | "Rejected"

        tags?: Tags
    }

    /**
     * Describes the Repayment relationships.
     */
    relationships: {
        /**
         * The [Credit Account](https://www.unit.co/docs/api/credit-accounts/) the repayment is made for.
         */
        creditAccount: Relationship

        /**
         * The org the customer belongs to.
         */
        org: Relationship

        /**
         * The payment created between the account and the counterparty
         */
        payment: Relationship

        /**
         * The [Customer](https://www.unit.co/docs/api/customers/) the deposit account belongs to. This relationship is only available if the account belongs to a single customer, business or individual.
         */
        customer?: Relationship

        /**
         * Only present when re repayment was created through a [Recurring Repayment](https://www.unit.co/docs/api/recurring-repayments/).
         */
        recurringRepayment?: Relationship
    }
}

type BaseBookRepayment = BaseRepayment & {
    relationships: {
        /**
         * The [Deposit Account](https://www.unit.co/docs/api/deposit-accounts/) the repayment to be made from.
         */
        counterpartyAccount: Relationship
    }
}

export type BookRepayment = BaseBookRepayment & {
    type: "bookRepayment"

    relationships: {
        /**
         * The [Deposit Account](https://www.unit.co/docs/api/deposit-accounts/) originating the repayment.
         */
        account: Relationship
    }
}

export type CapitalPartnerBookRepayment = BaseBookRepayment  & {
    type: "capitalPartnerBookRepayment"
}

type BaseAchRepayment = BaseRepayment & {
    relationships: {
        /**
         * The [Counterparty](https://www.unit.co/docs/api/deposit-accounts/) the repayment to be made from.
         */
        counterparty: Relationship
    }
}

export type AchRepayment = BaseRepayment & {
    type: "achRepayment"

    relationships: {
        /**
         * The [Deposit Account](https://www.unit.co/docs/api/deposit-accounts/) originating the repayment.
         */
        account: Relationship
    }
} 

export type CapitalPartnerAchRepayment = BaseAchRepayment & {
    type: "capitalPartnerAchRepayment"
}

export type Repayment = AchRepayment | BookRepayment | CapitalPartnerAchRepayment | CapitalPartnerBookRepayment