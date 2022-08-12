import { CardNetwork, Direction, HealthcareAmounts, Relationship, Tags } from "./common"
import { CardRelatedTransactionsBaseAttributes, BaseTransactionRelationships } from "./transactions"

export type AuthorizationRequest = CardTransactionAuthorizationRequest | PurchaseAuthorizationRequest | AtmAuthorizationRequest

export type CardTransactionAuthorizationRequest = {
    /**
     * Identifier of the card transaction authorization request resource.
     */
    id: string

    /**
     * Type of the authorization request resource. The value is always cardTransactionAuthorizationRequest.
     */
    type: "cardTransactionAuthorizationRequest"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * Indicates whether the transaction was created over an electronic network (primarily the internet).
         */
        ecommerce: boolean
    } & AuthorizationRequesBaseAttributes & CardRelatedTransactionsBaseAttributes

    relationships: AuthorizationRequesBaseRelationships & BaseTransactionRelationships
}

export type PurchaseAuthorizationRequest = {
    /**
     * Identifier of the card transaction authorization request resource.
     */
    id: string

    /**
     * Type of the authorization request resource. The value is always purchaseAuthorizationRequest.
     */
    type: "purchaseAuthorizationRequest"

    /**
    * JSON object representing the transaction data.
    */
    attributes: {
        /**
         * Indicates whether the transaction was created over an electronic network (primarily the internet).
         */
        ecommerce: boolean

        /**
         * Optional. [IIAS](https://en.wikipedia.org/wiki/Inventory_Information_Approval_System) related data for FSA/HRA enabled cards.
         */
        healthcareAmounts?: HealthcareAmounts
    } & AuthorizationRequesBaseAttributes & CardRelatedTransactionsBaseAttributes

    relationships: AuthorizationRequesBaseRelationships & BaseTransactionRelationships
}

export type AtmAuthorizationRequest = {
    /**
     * Identifier of the card transaction authorization request resource.
     */
    id: string

    /**
     * Type of the authorization request resource. The value is always atmAuthorizationRequest.
     */
    type: "atmAuthorizationRequest"

    attributes: {
        direction: Direction
        atmName: string
        atmLocation?: string
        surcharge: number
        internationalServiceFee: number
        cardNetwork?: CardNetwork
        tags?: Tags
    } & AuthorizationRequesBaseAttributes

    relationship: {
        /**
         * The debit card used in the transaction.
         */
        card: Relationship
    } & BaseTransactionRelationships
}

type AuthorizationRequesBaseAttributes = {
    /**
     * Date only. The date the resource was created.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    createdAt: string

    /**
     * The amount (cents) of the authorization request.
     */
    amount: number

    /**
     * The status of the authorization request. Either Pending, Approved or Declined.
     */
    status: "Pending" | "Approved" | "Declined"

    /**
     * Indicates whether the authorization request supports partial amount approval.
     */
    partialApprovalAllowed: boolean

    /**
     * 	Optional. The amount (cents) that was approved. Available only when status is Approved.
     */
    approvedAmount?: boolean

    /**
     * Optional. The reason the authorization request was declined.
     * One of AccountClosed, CardExceedsAmountLimit, DoNotHonor, InsufficientFunds, InvalidMerchant, ReferToCardIssuer, RestrictedCard, Timeout, TransactionNotPermittedToCardholder.
     * Available only when status is Declined
     */
    declineReason?: AuthorizationRequestDeclineReason
}

type AuthorizationRequesBaseRelationships = {
    /**
     * The debit card used in the transaction.
     */
    card: Relationship

    /**
     * An alternate Deposit Account that will be used for funding the transaction.
     */
    fundingAccount?: Relationship
}





export interface ApproveAuthorizationRequest {
    id: string
    amount?: number
}


export interface DeclineAuthorizationRequest {
    id: string
    reason: AuthorizationRequestDeclineReason
}

export type AuthorizationRequestDeclineReason = "AccountClosed" | "CardExceedsAmountLimit" | "DoNotHonor" | "InsufficientFunds" | "InvalidMerchant" | "ReferToCardIssuer" | "RestrictedCard" | "Timeout" | "TransactionNotPermittedToCardholder"

