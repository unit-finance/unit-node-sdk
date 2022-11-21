import { CreateRequestBaseAttributes, Relationship, Tags } from "./common"

export type RepaymentStatus = "Pending" | "PendingReview" | "Rejected" | "Sent" | "Returned"

export interface RepaymentBaseAttributes {
    /**
     * RFC3339 Date string	The date the resource was created.
     */
    createdAt: string

    /**
     * RFC3339 Date string	The date the resource was updated.
     */
    updatedAt: string

    /**
     * The amount (cents) of the payment.
     */
    amount: number

    /**
     * Either Pending, PendingReview, Returned, Sent or Rejected
     */
    status: RepaymentStatus

    /**
     * See [Tags](https://developers.unit.co/#tags).
     */
    tags?: Tags
}

export interface RepaymentBaseRelationships {
    /**
     * The [Deposit Account](https://developers.unit.co/deposit-accounts/) originating the repayment.
     */
    account: Relationship

    /**
     * The [Credit Account](https://developers.unit.co/credit-accounts/) the repayment is made for.
     */
    creditAccount: Relationship

    /**
     * The org the customer belongs to.
     */
    org: Relationship

    /**
     * The [Customer](https://developers.unit.co/customers/) the deposit account belongs to. This relationship is only available if the account belongs to a single customer, business or individual.
     */
    customer?: Relationship

    /**
     * The payment created between the account and counterpartyAccount
     */
    payment: Relationship
}

export interface AchRepayment {
    /**
     * 	Identifier of the ACH repayment resource.
     */
    id: string

    /**
     * 	Type of the payment resource. For ach repayment the value is achRepayment.
     */
    type: "achRepayment"

    /**
     * JSON object representing the repayment resource.
     */
    attributes: {} & RepaymentBaseAttributes

    /**
     * Describes relationships between the book repayment and the originating deposit account, credit account and org.
     */
    relationships: {
        /**
         * The [Counterparty](https://developers.unit.co/payments-counterparties/) the repayment to be made from.
         */
        counterparty: Relationship
    } & RepaymentBaseRelationships
}

export interface BookRepayment {
    /**
     * 	Identifier of the Book repayment resource.
     */
    id: string

    /**
     * 	Type of the payment resource. For ach repayment the value is bookRepayment.
     */
    type: "bookRepayment"

    /**
     * JSON object representing the book repayment resource.
     */
    attributes: {} & RepaymentBaseAttributes

    /**
     * Describes relationships between the ACH repayment and the originating deposit account, credit account and org.
     */
    relationships: {
        /**
         * The [Deposit Account](https://developers.unit.co/deposit-accounts/) the repayment to be made from.
         */
        counterpartyAccount: Relationship
    } & RepaymentBaseRelationships
}


export type Repayment = AchRepayment | BookRepayment

interface CreateRepaymentBaseRelationships {
    /**
     * The [Deposit Account](https://developers.unit.co/deposit-accounts/) the repayment will be deposit to.
     */
    account: Relationship

    /**
     * The [Credit Account](https://developers.unit.co/resources/#credit-account) that the repayment is made against.
     */
    creditAccount: Relationship
}

export interface CreateAchRepaymentRequest {
    type: "achRepayment"
    attributes: {
        /**
         * The amount to repay.
         */
        amount: number

        /**
         * Payment description (maximum of 50 characters), also known as Company Entry Description, this will show up on statement of the counterparty.
         */
        description: string

        /**
         * Optional, additional payment description (maximum of 80 characters), not all institutions present that.
         */
        addenda?: string
    }
    relationships: {
        /**
         *  The [ACH Counterparty](https://developers.unit.co/resources/#counterparty-resource) the repayment will come from.
         */
        counterparty: Relationship
    } & CreateRepaymentBaseRelationships
}

export interface CreateBookRepaymentRequest {
    type: "bookPayment"
    attributes: {
        /**
         * The amount (cents) to repay.
         */
        amount: number

        /**
         * Repayment description (maximum of 80 characters), this will show up on statement of the counterparty.
         */
        description: string

        /**
         * If this field is populated, its contents will be returned as the bookTransaction’s summary field (maximum of 100 characters).
         */
        transactionSummaryOverride: string
    } & CreateRequestBaseAttributes

    relationships: {
        /**
         * The [Deposit Account](https://developers.unit.co/deposit-accounts/) the repayment funds are taken from.
         */
        counterpartyAccount: Relationship
    } & CreateRepaymentBaseRelationships
}

export type CreateRepaymentRequest = CreateAchRepaymentRequest | CreateBookRepaymentRequest