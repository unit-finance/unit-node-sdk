import { Merchant, Relationship } from "./common"

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
         * Optional. The reason the authorization was declined. Available only when status is Declined
         */
        declineReason?: string

        merchant: Merchant

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
    }
}
