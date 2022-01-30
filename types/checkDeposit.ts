import { Relationship } from "./common";

export interface CheckDeposit {
    type: "checkDeposit"
    attributes: {
        /**
         * The check amount (in cents) to deposit.
         */
        amount: number

        /**
         * Optional. Description of the check deposit (maximum of 50 characters).
         */
        description?: string

        /**
         * Optional. See Tags.
         */
        tags?: object

        /**
         * Optional. See Idempotency.
         */
        idempotencyKey?: string
    }

    relationships: {
        /**
         * The account receiving the check deposit.
         */
        account: Relationship
    }
}

export interface CreateCheckDepositRequest {

}