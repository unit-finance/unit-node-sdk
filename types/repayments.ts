import { BaseCreateAchRepaymentRequest, BaseCreateBookRepaymentRequest, BaseCreateCapitalPartnerAchRepaymentRequest, BaseCreateCapitalPartnerBookRepaymentRequest } from "./baseRepaymentTypes"
import { Relationship, Tags } from "./common"

type BaseCreateRepaymentRequest = {
    attributes: {
         /**
         * The amount (Cents) to repay.
         */
         amount: number 
    }
}

export type CreateBookRepaymentRequest = BaseCreateBookRepaymentRequest & BaseCreateRepaymentRequest & {
    type: "bookRepayment"
}

export type CreateCapitalPartnerBookRepayment = BaseCreateCapitalPartnerBookRepaymentRequest & BaseCreateRepaymentRequest & { 
    type: "capitalPartnerBookRepayment"
}

export type CreateAchRepaymentRequest = BaseCreateAchRepaymentRequest & BaseCreateRepaymentRequest & {
    type: "achRepayment"
}

export type CreateCapitalPartnerAchRepaymentRequest = BaseCreateCapitalPartnerAchRepaymentRequest & BaseCreateRepaymentRequest & {
    type: "capitalPartnerAchRepayment"
}

export type CreateRepaymentRequest = CreateBookRepaymentRequest | CreateCapitalPartnerBookRepayment | CreateAchRepaymentRequest | CreateCapitalPartnerAchRepaymentRequest

type BaseRepayment = {
    /**
     * Identifier of the repayment resource.
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

export type BookRepaymentStatus = "Sent" | "Rejected"

type BaseBookRepayment = BaseRepayment & {
    attributes: {
        status: BookRepaymentStatus
    }

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

export type AchRepaymentStatus = "Pending" | "PendingReview" |  "Clearing" | "Returned" | "Sent" | "Rejected" | "Canceled"

type BaseAchRepayment = BaseRepayment & {
    attributes: {
        status: AchRepaymentStatus
    }

    relationships: {
        /**
         * The [Counterparty](https://www.unit.co/docs/api/deposit-accounts/) the repayment to be made from.
         */
        counterparty: Relationship
    }
}

export type AchRepayment = BaseAchRepayment & {
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