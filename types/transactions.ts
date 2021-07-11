import { Address, Coordinates, Counterparty, Relationship } from "./common"

export type Transaction = OriginatedAchTransaction | ReceivedAchTransaction | ReturnedAchTransaction | ReturnedReceivedAchTransaction | DishonoredAchTransaction |
    BookTransaction | PurchaseTransaction | AtmTransaction | FeeTransaction | CardReversalTransaction | CardTransaction | WireTransaction |
    ReleaseTransaction | AdjustmentTransaction | InterestTransaction | DisputeTransaction

export interface OriginatedAchTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always originatedAchTransaction.
     */
    type: "originatedAchTransaction"

    /**
     * JSON object representing the transaction data.
     */
    attributes: {
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
         * Transaction description.
         */
        description: string

        /**
         * The party on the other end of the transaction.
         */
        counterparty: Counterparty

        /**
        * See [Tags](https://developers.unit.co/#tags).
        * Inherited from the payment tags (see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
        */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship

        /**
         * The payment belonging to this transaction.
         */
        payment: Relationship
    }
}

export interface ReceivedAchTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always receivedAchTransaction.
     */
    type: "receivedAchTransaction"

    /**
     * JSON object representing the transaction data.
     */
    attributes: {
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

        /**
        * See [Tags](https://developers.unit.co/#tags).
        * Inherited from the payment tags (see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
        */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship
    }
}

export interface ReturnedAchTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always returnedAchTransaction.
     */
    type: "returnedAchTransaction"

    /**
     * JSON object representing the transaction data.
     */
    attributes: {
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

        /**
        * See [Tags](https://developers.unit.co/#tags).
        * Inherited from the payment tags (see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
        */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship

        /**
         * The payment belonging to this transaction.
         */
        payment: Relationship
    }
}

export interface ReturnedReceivedAchTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always returnedReceivedAchTransaction.
     */
    type: "returnedReceivedAchTransaction"

    /**
     * JSON object representing the transaction data.
     */
    attributes: {
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
         * The name by which the originator is known to the receiver.
         */
        companyName: string

        /**
         * The reason for the transaction return.
         */
        reason: string

        /**
        * See [Tags](https://developers.unit.co/#tags).
        * Inherited from the payment tags (see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
        */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship

        /**
         * The returned transaction.
         */
        returned: Relationship
    }
}

export interface DishonoredAchTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always dishonoredReceivedAchTransaction.
     */
    type: "dishonoredReceivedAchTransaction"

    /**
     * JSON object representing the transaction data.
     */
    attributes: {
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

        /**
        * See [Tags](https://developers.unit.co/#tags).
        * Inherited from the payment tags (see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
        */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
     relationships: {
        /**
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship
     }
}

export interface BookTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always bookTransaction.
     */
    type: "bookTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
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
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship

        /**
         * The account of the counterparty.
         */
        counterpartyAccount: Relationship

        /**
         * The counterparty customer.
         */
        counterpartyCustomer: Relationship
    }

    /**
    * See [Tags](https://developers.unit.co/#tags).
    * Inherited from the payment tags (see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
    */
    tags: object
}

export interface PurchaseTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always purchaseTransaction.
     */
    type: "purchaseTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
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

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship

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

export interface AtmTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always atmTransaction.
     */
    type: "atmTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
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

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship

        /**
         * The debit card involved in the transaction.
         */
        card: Relationship
    }
}

export interface FeeTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always feeTransaction.
     */
    type: "feeTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
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
         */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship

        /**
         * Optional. The transaction which the reversal is related to.
         */
        relatedTransaction?: Relationship
    }
}

export interface CardReversalTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always cardReversalTransaction.
     */
    type: "cardReversalTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
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
         * The last 4 digits of the debit card involved in the transaction.
         */
        cardLast4Digits: string

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship

        /**
         * Optional. The transaction which the reversal is related to.
         */
        relatedTransaction?: Relationship
    }
}

export interface CardTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always cardTransaction.
     */
    type: "cardTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
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
         * The last 4 digits of the debit card involved in the transaction.
         */
        cardLast4Digits: string

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship
    }
}

export interface WireTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always wireTransaction.
     */
    type: "wireTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
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

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship
    }
}

export interface ReleaseTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always releaseTransaction.
     */
    type: "releaseTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * Date only. The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

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
         * The amount (cents) of the transaction. Common to all transaction types.
         */
        amount: number

        /**
         * The direction in which the funds flow. Common to all transaction types. The value is always Credit.
         */
        direction: "Credit"

        /**
         * Description of the transaction as entered by the originator. Also known as OBI or “Originator to Beneficiary Information”.
         */
        description: string

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
         */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account receiving the funds.
         */
        account: Relationship
    }
}

export interface AdjustmentTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always adjustmentTransaction.
     */
    type: "adjustmentTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * Date only. The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

        /**
         * The amount (cents) of the transaction. Common to all transaction types.
         */
        amount: number

        /**
         * The direction in which the funds flow. Common to all transaction types.
         */
        direction: string

        /**
         * The account balance (cents) after the transaction. Common to all transaction types.
         */
        balance: number

        /**
         * Summary of the transaction. Common to all transaction types.
         */
        summary: string

        /**
         * Description of the transaction.
         */
        description: string

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account participating in the transaction.
         */
        account: Relationship
    }
}

export interface InterestTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always interestTransaction.
     */
    type: "interestTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
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
         */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship
    }
}

export interface DisputeTransaction {
    /**
     * Identifier of the transaction resource.
     */
    id: string

    /**
     * Type of the transaction resource. The value is always disputeTransaction.
     */
    type: "disputeTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
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
         * The reason for the dispute transaction, one of: ProvisionalCredit, ProvisionalCreditReversalDenied, ProvisionalCreditReversalResolved, FinalCredit.
         */
        reason: "ProvisionalCredit" | "ProvisionalCreditReversalDenied" | "ProvisionalCreditReversalResolved" | "FinalCredit"

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: object
    }

    /**
     * Describes relationships between the transaction resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The Deposit Account of the customer.
         */
        account: Relationship

        /**
         * The customer the deposit account belongs to. The customer is either a business or a individual.
         */
        customer: Relationship
    }
}