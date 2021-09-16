import { Relationship } from "./common"

export type AccountEndOfDay = AccountsEndOfDay

export interface AccountsEndOfDay {
    /**
     * Identifier of the account end of day resource.
     */
    id: string

    /**
     * Type of the resource, the value is always accountEndOfDay.
     */
    type: "accountEndOfDay"

    /**
     * Representing the account end of day data.
     */
    attributes: {
        /**
         * The date the account end-of-day resource was created.
         */
        date: string

        /**
         * The balance amount (in cents).
         */
        balance: number

        /**
         * The hold amount (in cents).
         */
        hold: number

        /**
         * The available balance for spending (in cents).
         */
        available: number
    }

    /**
     * Describes relationships between the statement resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The account.
         */
        account: Relationship
   
        /**
         * The customer.
         */
        customer: Relationship
   
        /**
         * The customers.
         */
        customers: Relationship[]
    }
}
