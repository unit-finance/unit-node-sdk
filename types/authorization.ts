import { Relationship } from "./common"

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
         * The debit card involved in the authorization.
         */
        card: Relationship
    }
}
