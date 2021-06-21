import { Relationship, Counterparty } from "./common";

export interface PatchPaymentRequest {
    type: "achPayment" | "bookPayment"
    attributes: {
        tags: object
    }
}
 
export type CreatePaymentRequest = CreateBookPaymentRequest | CreateInlinePaymentRequest | CreateLinkedPaymentRequest | CreateVerifiedPaymentRequest
 
export interface CreateBookPaymentRequest {
    type: 'bookPayment'
 
    attributes: {
        /**
         * The amount (in cents).
         */
        amount: number
 
        /**
         * Payment description (maximum of 50 characters), this will show up on statement of the counterparty.
         */
        description: string
 
        /**
         * See Idempotency.
         */
        idempotencyKey?: string
 
        /**
         * See Tags. Tags that will be copied to any transaction that this payment creates (see Tag Inheritance).
         */
        tags?: object
    }
 
    relationships: {
        /**
         * The Deposit Account originating the payment.
         */
        account: Relationship
 
        /**
         * The Counterparty account the payment to be made to
         */
        counterpartyAccount: Relationship
    }
}
 
export interface CreateInlinePaymentRequest {
    type: "achPayment"
 
    attributes: {
        /**
         * The amount (in cents).
         */
        amount: number
 
        /**
         * The direction in which the funds flow.
         */
        direction: string
 
        /**
         * The party on the other side of the ACH payment.
         */
        counterparty: Counterparty
 
        /**
         * Payment description (maximum of 10 characters), also known as Company Entry Description, this will show up on statement of the counterparty.
         */
        description: string
 
        /**
         * Optional, additional payment description (maximum of 50 characters), not all institutions present that.
         */
        addenda?: string
 
        /**
         * See Idempotency.
         */
        idempotencyKey: string
 
        /**
         * See Tags. Tags that will be copied to any transaction that this payment creates (see Tag Inheritance).
         */
        tags: object
    }
 
    relationships: {
        /**
         * The Deposit Account originating the payment.
         */
        account: Relationship
    }
 
}
 
export interface CreateLinkedPaymentRequest {
    type: "achPayment"
 
    attributes: {
        /**
        * The amount (in cents).
        */
        amount: number
 
        /**
         * The direction in which the funds flow.
         */
        direction: string
 
        /**
        * Payment description (maximum of 10 characters), also known as Company Entry Description, this will show up on statement of the counterparty.
        */
        description: string
 
        /**
         * Optional, additional payment description (maximum of 50 characters), not all institutions present that.
         */
        addenda?: string
 
        /**
         * See Idempotency.
         */
        idempotencyKey: string
 
        /**
         * See Tags. Tags that will be copied to any transaction that this payment creates (see Tag Inheritance).
         */
        tags: object
    }
 
    relationships: {
        /**
         * The Deposit Account originating the payment.
         */
        account: Relationship
 
        /**
         * The Counterparty the payment to be made to.
         */
        counterparty: Relationship
    }
}
 
export interface CreateVerifiedPaymentRequest {
    type: "achPayment"
 
    attributes: {
        /**
         * The amount (in cents).
         */
        amount: number
 
        /**
         * The direction in which the funds flow.
         */
        direction: string
 
        /**
        * Payment description (maximum of 10 characters), also known as Company Entry Description, this will show up on statement of the counterparty.
        */
        description: string
 
        /**
         * See Idempotency.
         */
        idempotencyKey: string
 
        /**
         * Name of the person or company that owns the counterparty bank account.
         */
        counterpartyName: string
 
        /**
         * See Create Plaid processor token API
         */
        plaidProcessorToken: string
    }
 
    relationships: {
        /**
         * The Deposit Account originating the payment.
         */
        account: Relationship
    }
}