import { Relationship, RelationshipsArray } from "./common"

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
         * The balance amount (in cents). The balance equals thee sum of 'available' and 'hold'.
         */
        balance: number

        /**
         * The hold amount (in cents). Not available for spending.
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
         * The account the resource belongs to.
         */
        account: Relationship
   
        /**
         * The Customer the deposit account belongs to. This relationship is only available if the account belongs to a single customer, business or individual.
         */
        customer?: Relationship
   
        /**
         * The list of Customers the deposit account belongs to. This relationship is only available if the account belongs to multiple individual customers.
         */
        customers?: RelationshipsArray
    }
}
