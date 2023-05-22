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
         * The Deposit Account the repayment will be deposited to.
         */
        account: Relationship

        /**
         * The Credit Account that the repayment is made against.
         */
        creditAccount: Relationship
    }
}

export type CreateBookRepaymentRequest = BaseCreateRepaymentRequest & {
    type: "bookRepayment"

    attributes: {
        /**
         * If this field is populated, its contents will be returned as the bookTransaction’s summary field (maximum of 100 characters).
         */
        transactionSummaryOverride: string
    }

    relationships: {
        /**
         * The Deposit Account the repayment funds are taken from.
         */
        counterpartyAccount: Relationship
    }
}

export type CreateAchRepaymentRequest = BaseCreateRepaymentRequest & {
    type: "achRepayment"

    attributes: {
        /**
         * Optional, additional payment description (maximum of 80 characters), not all institutions present that.
         */
        addenda: string
    }

    relationships: {
        /**
         * The ACH Counterparty the repayment will come from.
         */
        counterparty: Relationship
    }
}

export type CreateRepaymentRequest = CreateBookRepaymentRequest | CreateAchRepaymentRequest


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
         * The Deposit Account originating the repayment.
         */
        account: Relationship

        /**
         * The Credit Account the repayment is made for.
         */
        creditAccount: Relationship

        /**
         * The org the customer belongs to.
         */
        org: Relationship

        /**
         * The Customer the deposit account belongs to. This relationship is only available if the account belongs to a single customer, business or individual.
         */
        customer?: Relationship

        /**
         * The payment created between the account and the counterparty
         */
        payment: Relationship
    }
}

export type BookRepayment = BaseRepayment & {
    type: "bookRepayment"

    relationships: {
        /**
         * The Deposit Account the repayment to be made from.
         */
        counterpartyAccount: Relationship
    }
}

export type AchRepayment = BaseRepayment & {
    type: "achRepayment"

    relationships: {
        /**
         * The Counterparty the repayment to be made from.
         */
        counterparty: Relationship
    }
} 

export type Repayment = AchRepayment | BookRepayment