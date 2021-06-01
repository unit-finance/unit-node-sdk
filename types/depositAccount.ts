import { Relationship } from "./core";

export interface DepositAccount {
    /**
     * Identifier of the deposit account resource.
     */
    id: string

    /**
     * Type of the resource, the value is always depositAccount.
     */
    type: 'depositAccount'

    /**
     * Representing the deposit account data.
     */
    attributes: {
        /**
         * Date only. The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

        /**
         * Name of the account holder.
         */
        name: string

        /**
         * The name of the deposit product.
         */
        depositProduct: string

        /**
         * Routing number of account.
         */
        routingNumber: string

        /**
         * Account number, together with the routingNumber forms the identifier of the account on the ACH network.
         */
        accountNumber: string

        /**
         * Currency of the account.
         * Note: the currency is currently always set to USD. The balance is represented in cents.
         */
        currency: string

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

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: Object

        /**
         * Status of the account, either Open or Closed.
         */
        status: string
    }

    /**
     * Describes relationships between the deposit account resource and the customer.
     */
    relationships: {
        /**
         * The customer.
         */
        customer: Relationship
    }
}

export interface CreateDepositAccountRequest {
    /**
     * Type of the resource, the value is always depositAccount.
     */
    type: "depositAccount"

    /**
     * Representing the deposit account data.
     */
    attributes: {
        /**
         * The name of the deposit product.
         */
        depositProduct: string

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: Object

        /**
         * See [Idempotency.](https://developers.unit.co/#intro-idempotency)
         */
        idempotencyKey?: string
    }

    /**
     * Describes relationships between the deposit account resource and the customer.
     */
    relationships: {
        /**
         * The customer.
         */
        customer: {
            data: Relationship
        }
    }
}

export interface PatchDepositAccountRequest {
    accountId: number

    data: {
        type: "depositAccount"
        attributes: {
            tags: object
        }
    }
}