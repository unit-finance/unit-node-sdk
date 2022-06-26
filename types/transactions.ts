import { Address, Coordinates,Direction, Counterparty, Merchant, Relationship, Tags, UnimplementedFields, RelationshipsArray } from "./common"

export type Transaction = OriginatedAchTransaction | ReceivedAchTransaction | ReturnedAchTransaction | ReturnedReceivedAchTransaction | DishonoredAchTransaction |
    BookTransaction | PurchaseTransaction | AtmTransaction | FeeTransaction | CardReversalTransaction | CardTransaction | WireTransaction |
    ReleaseTransaction | AdjustmentTransaction | InterestTransaction | DisputeTransaction | CheckDepositTransaction | ReturnedCheckDepositTransaction |
    PaymentAdvanceTransaction | RepaidPaymentAdvanceTransaction

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

export interface BaseTransactionAttributes extends UnimplementedFields {
    /**
     * Date only. The date the resource was created.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    createdAt: string

    /**
     * The direction in which the funds flow. Common to all transaction types.
     */
    direction: Direction

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
    tags?: Tags

}

export interface BaseTransactionRelationships extends UnimplementedFields {
    /**
     * The [Deposit Account](https://developers.unit.co/deposit-accounts/) of the customer.
     */
    account: Relationship

    /**
     * The [Customer](https://developers.unit.co/customers/) the deposit account belongs to.
     * This relationship is only available if the account belongs to a single customer, business or individual.
     */
    customer?: Relationship

    /**
     * The list of [Customers](https://developers.unit.co/customers/) the deposit account belongs to. This relationship is only available if the account belongs to multiple individual customers.
     */
    customers?: RelationshipsArray
}

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
         * Optional, additional transaction description.
         */
        addenda?: string

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
     * Type of the transaction resource. The value is always dishonoredAchTransaction.
     */
    type: "dishonoredAchTransaction"

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

        /**
         * The payment belonging to this transaction
         */
        payment?: Relationship
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

        merchant: Merchant

        /**
         * Optional. Coordinates (latitude, longitude) of where the purchase took place.
         */
        coordinates?: Coordinates

        /**
         * Indicates whether the transaction is recurring
         */
        recurring: boolean

        /**
         * Optional. The interchange share for this transaction. Calculated at the end of each day, see the transaction.updated event.
         */
        interchange?: number

        /**
         * Indicates whether the transaction was created over an electronic network (primarily the internet).
         */
        ecommerce: boolean

        /**
         * Indicates whether the card was present when the transaction was created.
         */
        cardPresent: boolean

        /**
         * Optional. The payment method used, one of: Manual, Swipe, Contactless, ChipAndPin, Stored, Other.
         */
        paymentMethod?: string

        /**
         * Optional. The type of digital wallet used, one of: Google, Apple, Other.
         */
        digitalWallet?: string

        /**
         * Optional. The verification method used, one of: Address, CVV2, AddressAndCVV2.
         */
        cardVerificationData?: {
            verificationMethod?: string
        }
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

        /**
         * The preceding authorization request, if present (see [Authorization Requests](https://developers.unit.co/cards-authorization-requests/)).
         */
        authorizationRequest?: Relationship
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

        /**
         * Optional. The interchange share for this transaction.
         * Calculated at the end of each day, see the [transaction.updated](https://developers.unit.co/events/#transactionupdated) event.
         */
        intercharge?: number
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
         * Optional. The transaction which the fee is subject to.
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

        merchant: Merchant

        /**
         * Optional. Indicates whether the transaction is recurring.
         */
        recurring?: boolean

        /**
         * Optional. The interchange share for this transaction. Calculated at the end of each day, see the [transaction.updated](https://developers.unit.co/events/#transactionupdated) event.
         */
        interchange?: number

        /**
         * Optional. The payment method used, one of: Manual, Swipe, Contactless, ChipAndPin, Stored, Other.
         */
        paymentMethod?: string


        /**
         * Optional. The type of digital wallet used, one of: Google, Apple, Other.
         */
        digitalWallet?: string

        /**
         * Optional. The verification method used, one of: Address, CVV2, AddressAndCVV2.
         */
        cardVerificationData?: {
            verificationMethod?: string
        }


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
         * Originator To Beneficiary Information, multi-line string delimited by \n.
         */
        originatorToBeneficiaryInformation: string

        /**
         * Sender reference.
         */
        senderReference: string

        /**
         * Reference for the Beneficiary.
         */
        referenceForBeneficiary: string

        /**
         * Beneficiary Information, multi-line string delimited by \n.
         */
        beneficiaryInformation: string

        /**
         * Beneficiary Advice Information, multi-line string delimited by \n.
         */
        beneficiaryAdviceInformation: string
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

    relationships: {
        /**
         * The transaction that has been disputed.
         */
        disputedTransaction?: Relationship
    }
}

export type CheckDepositTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always checkDepositTransaction.
     */
    type: "checkDepositTransaction"

    /**
     * Describes relationships between the transaction resource and other resources (account, customer, checkDeposit).
     */
    relationships: {
        /**
         * The [Check Deposit](https://developers.unit.co/resources/#check-deposit) the transaction is related to.
         */
        checkDeposit: Relationship
    }
}

export type ReturnedCheckDepositTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always returnedCheckDepositTransaction.
     */
    type: "returnedCheckDepositTransaction"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * The reason for the transaction return.
         */
        reason: string
    }

    /**
     * Describes relationships between the transaction resource and other resources (account, customer, checkDeposit).
     */
    relationships: {
        /**
         * The [Check Deposit](https://developers.unit.co/resources/#check-deposit) the transaction is related to.
         */
        checkDeposit: Relationship
    }
}

export type PaymentAdvanceTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always paymentAdvanceTransaction.
     */
    type: "paymentAdvanceTransaction"

    attributes: {
        direction: "Debit"
    }

    /**
     * Describes relationships between the transaction resource and other resources (account, customer, receivedPayment).
     */
    relationships: {
        /**
         * The [ReceivedPayment](https://developers.unit.co/received-ach/) that was advanced and funded with this transaction.
         */
        receivedPayment: Relationship
    }
}

export type RepaidPaymentAdvanceTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always repaidPaymentAdvanceTransaction.
     */
    type: "repaidPaymentAdvanceTransaction"

    /**
     * Describes relationships between the transaction resource and other resources (account, customer, receivedPayment).
     */
    relationships: {
        /**
         * The [ReceivedPayment](https://developers.unit.co/received-ach/) that was advanced and funded with this transaction.
         */
        receivedPayment: Relationship

        /**
         * The transaction that Debit the account for the advance that this repayment is related to.
         */
        paymentAdvanceTransaction: Relationship
    }
}

export type RewardTransaction = BaseTransaction & {
    /**
     * Type of the transaction resource. The value is always rewardTransaction.
     */
    type: "rewardTransaction"

    /**
     * JSON object representing the transaction data.
     */
    attributes: {
        /**
         * The receiving party of the transaction.
         */
        receiverCounterparty: Counterparty
    }

    /**
     * Describes relationships between the transaction resource and other resources (account, customer, receivedPayment).
     */
    relationships: {
        /**
         * The reward belonging to this transaction.
         */
        reward: Relationship

        /**
         * The Deposit Account receiver.
         */
        receiverAccount: Relationship
    }
}
