import {Relationship, Tags} from "./common"

export interface Fee {
    /**
     * Identifier of the fee resource.
     */
    id: string

    /**
     * Type of the fee resource. The value is always fee.
     */
    type: "fee"

    /**
     * JSON object representing the fee data.
     */
    attributes: {
        /**
         * The amount (in cents) of the fee.
         */
        amount: number

        /**
         * Description of the fee.
         */
        description: string

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags?: Tags
    }

    /**
     * Describes relationships between the fee resource and other resources (accounts).
     */
    relationships: {
        /**
         * The account the fee belongs to.
         */
        account: Relationship
    }
}

export interface CreateFeeRequest {
    /**
     * Type of the resource, the value is always fee.
     */
    type: "fee"

    /**
      * Representing the fee data.
      */
    attributes: {
        /**
         * The amount (in cents) to charge the account.
         */
        amount: number

        /**
         * Description of the fee (maximum of 50 characters).
         */
        description: string

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags?: Tags

        /**
         * See [Idempotency.](https://developers.unit.co/#intro-idempotency)
         */
        idempotencyKey?: string
    }

    /**
     * Describes relationships between the fee and the account.
     */
    relationships: {
        /**
         * The account the fee belongs to.
         */
        account: Relationship
    }
}

export interface FeeReversal {
    /**
     * Identifier of the fee resource.
     */
    type: "fee reversal"
    /**
     * Identifier of the fee resource.
     */
    id: string
    attributes: {
        /**
         * Description of the fee.
         */
        description: number
        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: Tags
    }
    relationships: {
        /**
         * The account the fee belongs to.
         */
        account: Relationship
    }
}

export interface FeeReversalRequest {
    /**
     * Type of the resource, the value is always fee.
     */
    type: "feeReversal"

    /**
     * Representing the fee data.
     */
    attributes: {
        /**
         * Description of the fee (maximum of 50 characters).
         */
        description: string

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags?: Tags

        /**
         * See [Idempotency.](https://developers.unit.co/#intro-idempotency)
         */
        idempotencyKey?: string
    }
    /**
     * Describes relationships between the fee and the account.
     */
    relationships: {
        /**
         * The account to reverse the fee.
         */
        account: Relationship
        /**
         * The transaction to reverse
         */
        transaction: Relationship
    }
}
