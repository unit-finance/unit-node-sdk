import { CardNetwork, Merchant, Relationship, Tags, UnimplementedRelationships } from "./common"

export type AuthorizationStatus = "Authorized" | "Completed" | "Canceled" | "Declined"

export interface Authorization {
    /**
     * Identifier of the authorization resource.
     */
    id: string

    /**
     * Type of the authorization resource. The value is always authorization.
     */
    type: "authorization"

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
         * The last 4 digits of the debit card involved in the authorization.
         */
        cardLast4Digits: string

        /**
         * One of Authorized, Completed, Canceled, Declined, see Authorization Statuses.
         */
        status: AuthorizationStatus

        /**
         * Optional. The reason the authorization was declined. Available only when status is Declined.
         */
        declineReason?: string

        merchant: Merchant

        /**
         * Indicates whether the authorization is recurring.
         */
        recurring: boolean

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

        /**
         * Optional. The card network used, one of: Visa, Interlink, Accel, Allpoint, Other.
         */
        cardNetwork?: CardNetwork

        /**
         * See [Tags](https://developers.unit.co/#tags).
         * Inherited from the payment tags (see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
         */
        tags?: Tags

        /**
         * 	Optional. Cash withdrawal amount.
         */
        cashWithdrawalAmount?: number

        /**
         * Optional. Summary of the authorization.
         */
        summary?: string
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
        customer?: Relationship
        
        /**
         * The debit card involved in the authorization.
         */
        card: Relationship

        /**
         * The list of Customers the deposit account belongs to. This relationship is only available if
         * the account belongs to multiple individual customers.
         */
        customers?: Relationship

        /**
         * The preceding authorization request, if present (see docs.unit.co/cards-authorization-requests).
         */
        authorizationRequest?: Relationship
    } & UnimplementedRelationships
}
