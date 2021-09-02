import { Address, Coordinates, Counterparty, Relationship } from "./common"

export type Transaction = OriginatedAchTransaction | ReceivedAchTransaction | ReturnedAchTransaction | ReturnedReceivedAchTransaction | DishonoredAchTransaction |
    BookTransaction | PurchaseTransaction | AtmTransaction | FeeTransaction | CardReversalTransaction | CardTransaction | WireTransaction |
    ReleaseTransaction | AdjustmentTransaction | InterestTransaction | DisputeTransaction

export interface BaseTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource.
     */
    type: string

    /**
     * JSON object representing the transaction data.
     */
    attributes: BaseTransactionAttributes

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: BaseTransactionRelationships
}

export interface BaseTransactionAttributes {
    /**
     * Date only. The date the resource was created.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    createdAt: string

    /**
     * The direction in which the funds flow. Common to all transaction types.
     */
    direction: string

    /**
     * The amount (cents) of the transaction. Common to all transaction types.
     */
    amount: number

    /**
     * The account balance (cents) after the transaction. Common to all transaction types.
     */
    balance: number

    /**
     * Summary of the transaction. Common to all transaction types.
     */
    summary: string

    /**
     * See [Tags](https://developers.unit.co/#tags).
     * Inherited from the payment tags (see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
     */
    tags: Record<string, any>
}

export interface BaseTransactionRelationships {
    /**
     * The Deposit Account of the customer.
     */
    account: Relationship

    /**
     * The customer the deposit account belongs to. The customer is either a business or a individual.
     */
    customer?: Relationship
}

// OriginatedAchTransaction
export type OriginatedAchTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always originatedAchTransaction.
     */
    type: "originatedAchTransaction"

    /**
     * JSON object representing the transaction data.
     */
    attributes: {
        /**
         * Transaction description.
         */
        description: string

        /**
         * The party on the other end of the transaction.
         */
        counterparty: Counterparty
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The payment belonging to this transaction.
         */
        payment: Relationship
    }
}

export type ReceivedAchTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always receivedAchTransaction.
     */
    type: "receivedAchTransaction"

    /**
     * JSON object representing the transaction data.
     */
    attributes: {
        /**
         * Transaction description.
         */
        description: string

        /**
         * Optional. Additional transaction description (maximum of 50 characters).
         */
        addenda?: string

        /**
         * The name by which the originator is known to the receiver.
         */
        companyName: string

        /**
         * The routing number of the party that originated the ACH payment.
         */
        counterpartyRoutingNumber: string

        /**
         * The ACH Trace Number.
         */
        traceNumber: number

        /**
         * Optional. The 3-letter ACH Standard Entry Class (SEC) Code (e.g. WEB, CCD, PPD, etc.).
         */
        secCode?: string
    }
}

export type ReturnedAchTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always returnedAchTransaction.
     */
    type: "returnedAchTransaction"

    /**
     * JSON object representing the transaction data.
     */
    attributes: {
        /**
         * The name by which the originator is known to the receiver.
         */
        companyName: string

        /**
         * The name of the party that originated the ACH payment.
         */
        counterpartyName: string

        /**
         * The routing number of the party that originated the ACH payment.
         */
        counterpartyRoutingNumber: string

        /**
         * The reason for the transaction return.
         */
        reason: string
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The payment belonging to this transaction.
         */
        payment: Relationship
    }
}

export type ReturnedReceivedAchTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always returnedReceivedAchTransaction.
     */
    type: "returnedReceivedAchTransaction"

    /**
     * JSON object representing the transaction data.
     */
    attributes: {
        /**
         * The name by which the originator is known to the receiver.
         */
        companyName: string

        /**
         * The reason for the transaction return.
         */
        reason: string
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The returned transaction.
         */
        returned: Relationship
    }
}

export type DishonoredAchTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always dishonoredReceivedAchTransaction.
     */
    type: "dishonoredReceivedAchTransaction"

    /**
     * JSON object representing the transaction data.
     */
    attributes: {
        /**
         * Transaction description.
         */
        description: string

        /**
         * The name by which the originator is known to the receiver.
         */
        companyName: string

        /**
         * The routing number of the party that originated the ACH payment.
         */
        counterpartyRoutingNumber: string

        /**
         * The ACH Trace Number.
         */
        traceNumber: number

        /**
         * The reason for the dishonored return.
         */
        reason: string

        /**
         * Optional. The 3-letter ACH Standard Entry Class (SEC) Code (e.g. WEB, CCD, PPD, etc.).
         */
        secCode?: string
    }
}

export type BookTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always bookTransaction.
     */
    type: "bookTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * The party on the other end of the transaction.
         */
        counterparty: Counterparty

        /**
         * The ACH Trace Number.
         */
        traceNumber: number
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The account of the counterparty.
         */
        counterpartyAccount: Relationship

        /**
         * The counterparty customer.
         */
        counterpartyCustomer: Relationship
    }
}

export type PurchaseTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always purchaseTransaction.
     */
    type: "purchaseTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * The last 4 digits of the debit card involved in the transaction.
         */
        cardLast4Digits: string

        /**
         * 
         */
        merchant: {
            /**
             * The name of the merchant.
             */
            name: string

            /**
             * The 4-digit ISO 18245 merchant category code (MCC).
             */
            type: number

            /**
             * The merchant category, described by the MCC code (see this reference for the list of category descriptions).
             */
            category: string

            /**
             * Optional. The location (city, state, etc.) of the merchant.
             */
            location?: string
        }

        /**
         * Optional. Coordinates (latitude, longitude) of where the purchase took place.
         */
        coordinates?: Coordinates

        /**
         * Indicates whether the transaction is recurring
         */
        recurring: boolean
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The debit card involved in the transaction.
         */
        card: Relationship

        /**
         * Optional. The [Authorization](https://developers.unit.co/#authorization) request made by the merchant, if present (see [Authorizations](https://developers.unit.co/#authorizations)).
         */
        authorization?: Relationship
    }
}

export type AtmTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always atmTransaction.
     */
    type: "atmTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * The last 4 digits of the debit card involved in the transaction.
         */
        cardLast4Digits: string

        /**
         * The name of the ATM.
         */
        atmName: string

        /**
         * Optional. The location (city, state, etc.) of the ATM.
         */
        atmLocation?: string

        /**
         * The surcharge fee (cents) for the transaction.
         */
        surcharge: number
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The debit card involved in the transaction.
         */
        card: Relationship
    }
}

export type FeeTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always feeTransaction.
     */
    type: "feeTransaction"

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * Optional. The transaction which the reversal is related to.
         */
        relatedTransaction?: Relationship
    }
}

export type CardReversalTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always cardReversalTransaction.
     */
    type: "cardReversalTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * The last 4 digits of the debit card involved in the transaction.
         */
        cardLast4Digits: string
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * Optional. The transaction which the reversal is related to.
         */
        relatedTransaction?: Relationship
    }
}

export type CardTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always cardTransaction.
     */
    type: "cardTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * The last 4 digits of the debit card involved in the transaction.
         */
        cardLast4Digits: string
    }
}

export type WireTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always wireTransaction.
     */
    type: "wireTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * The party on the other end of the transaction, either the beneficiary or the originator.
         */
        counterparty: Counterparty

        /**
         * Description of the transaction as entered by the originator. Also known as OBI or “Originator to Beneficiary Information”.
         */
        description: string

        /**
         * Sender reference.
         */
        senderReference: string

        /**
         * Reference for the Beneficiary.
         */
        referenceForBeneficiary: string
    }
}

export type ReleaseTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always releaseTransaction.
     */
    type: "releaseTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * Name of the sender.
         */
        senderName: string

        /**
         * Address of the sender.
         */
        senderAddress: Address

        /**
         * 	Unique identifier to monitor for similar sending accounts, could be the BIN + last four digits of the card number OR a unique identifier generated by you for the sender.
         */
        senderAccountNumber: string

        /**
         * The party who is releasing the funds
         */
        counterparty: Counterparty

        /**
         * The direction in which the funds flow. Common to all transaction types. The value is always Credit.
         */
        direction: "Credit"

        /**
         * Description of the transaction as entered by the originator. Also known as OBI or “Originator to Beneficiary Information”.
         */
        description: string
    }
}

export type AdjustmentTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always adjustmentTransaction.
     */
    type: "adjustmentTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * Description of the transaction.
         */
        description: string
    }
}

export type InterestTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always interestTransaction.
     */
    type: "interestTransaction"
}

export type DisputeTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always disputeTransaction.
     */
    type: "disputeTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * The reason for the dispute transaction, one of: ProvisionalCredit, ProvisionalCreditReversalDenied, ProvisionalCreditReversalResolved, FinalCredit.
         */
        reason: "ProvisionalCredit" | "ProvisionalCreditReversalDenied" | "ProvisionalCreditReversalResolved" | "FinalCredit"
    }
}
