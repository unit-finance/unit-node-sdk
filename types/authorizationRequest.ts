import {Relationship} from "./common"

export interface PurchaseAuthorizationRequest {
    /**
     * Identifier of the authorization resource.
     */
    id: string

    /**
     * Type of the authorization resource. The value is always authorization.
     */
    type: "purchaseAuthorizationRequest"

    /**
     * JSON object representing the authorization data.
     */
    attributes: {
        /**
         * RFC3339 Date string	The date the authorization was created.
         */
        createdAt: string

        /**
         * The amount (cents) of the authorization.
         */
        amount: number

        /**
         * The status of the authorization request. Either Pending, Approved or Declined.
         */
        status: string

        /**
         * Indicates whether the authorization request supports partial amount approval.
         */
        partialApprovalAllowed: boolean

        /**
         * Optional. The amount (cents) that was approved. Available only when status is Approved.
         */
        approvedAmount?: number

        /**
         * 	Optional. The reason the authorization request was declined.
         * 	One of  AccountClosed,
         * 	        CardExceedsAmountLimit,
         * 	        DoNotHonor,
         * 	        InsufficientFunds,
         * 	        InvalidMerchant,
         * 	        ReferToCardIssuer,
         * 	        RestrictedCard,
         * 	        Timeout,
         * 	        TransactionNotPermittedToCardholder.
         * Available only when status is Declined
         */
        declineReason?: string


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
         * Indicates whether the authorization is recurring
         */
        recurring: boolean
    }

    /**
     * Describes relationships between the authorization resource and other resources (account and customer).
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
         * The debit card used in the purchase.
         */
        card: Relationship
    }
}

export interface ApproveAuthorizationRequest {
    id: string
    amount?: number
}


export interface DeclineAuthorizationRequest {
    id: string
    /**
     * The reason for declining the authorization request.
     * One of AccountClosed,
     *        CardExceedsAmountLimit,
     *        DoNotHonor,
     *        InsufficientFunds,
     *        InvalidMerchant,
     *        ReferToCardIssuer,
     *        RestrictedCard,
     *        TransactionNotPermittedToCardholder.
     */
    reason: string
}

